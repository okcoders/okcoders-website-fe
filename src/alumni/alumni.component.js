import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf.js'
import { List, Pagination, Select } from 'antd'
import { isEmpty } from 'lodash';
import './alumni.component.css';
import { AlumniCard } from './AlumniCard.component';
import { JumboTron } from './JumboTron.component';
const Option = Select.Option;
const _ = require('lodash');

export function GetAge(birthday) {
  var today = new Date();
  var birthDate = new Date(birthday);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

export function Alumni(props) {
  const [alumni, setAlumni] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [visibleAlumni, setVisibleAlumni] = useState([]);
  const [tags, setTags] = useState([]);

  
  function resetAlumni() {
    return fetch(Config.websiteServiceUrl + "alumni")
        .then(res => res.json())
        .then(json => setAlumni(json))
  }

  useEffect(() => {
    if (isEmpty(visibleAlumni)) {
      fetch(Config.websiteServiceUrl + "alumni")
        .then(res => res.json())
        .then(json => {
          setVisibleAlumni(json);
          handleChange(tags)})
  }})

  useEffect(() => {
    if (isEmpty(allLanguages)) {
      fetch(Config.websiteServiceUrl + "language")
        .then(res => res.json())
        .then(json => setAllLanguages(json))
    }
  })

  function handleChange(value){
    setTags(value);
    if (value.length === 0){
      resetAlumni()
        .then(function() {
          setVisibleAlumni(alumni)
        });
    } else if (value.length !== 0){
        const visAlumni = _.filter(alumni, function(alum) {return !_.isEmpty(_.intersectionWith(alum.languages, value, (a, b) => a === b))})
        setVisibleAlumni(visAlumni);
    }}

  function makeOption() {
    const children = [];
    for (let i = 0; i < allLanguages.length; i++) {
      children.push(<Option key={allLanguages[i].language}>{allLanguages[i].language}</Option>);
    }
    return children
    }
  
  return (
      <>
      <JumboTron />
              <div>
              <Select
                mode="tags"
                className= "multiselect"
                style={{ width: '25%' }}
                placeholder="Tags Mode"
                onChange={handleChange}
                >
                {makeOption()}
              </Select>
              </div>
              <div style={{ background: '#fff', padding: 60, minHeight: 380 }}>
              <List
                grid={{
                  gutter: 16, column: 3
                }}
                bordered
                dataSource={visibleAlumni}
                renderItem={renderAlum}
              />
              <div className="pagination">
              <Pagination 
                showSizeChanger 
                onShowSizeChange={onShowSizeChange} 
                defaultCurrent={1} 
                total={alumni.length} />
              </div>
            </div>
    </>
  );
}

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}

function renderAlum(alum) {
  return (
    <>
      <List.Item>
        <AlumniCard alumni={alum}/>
      </List.Item>
    </>
  )
}