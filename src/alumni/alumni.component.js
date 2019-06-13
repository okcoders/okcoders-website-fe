import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf.js'
import { List, Pagination, Menu, Select, notification } from 'antd'
import { isEmpty } from 'lodash'
import './alumni.component.css';
import { AlumniCard } from './AlumniCard.component';
import { JumboTron } from './JumboTron.component';
const Option = Select.Option;

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

  useEffect(() => {
    if (isEmpty(alumni)) {
      fetch(Config.websiteServiceUrl + "alumni")
        .then(res => res.json())
        .then(json => setAlumni(json))
  }})

  useEffect(() => {
    if (isEmpty(allLanguages)) {
      fetch(Config.websiteServiceUrl + "language")
        .then(res => res.json())
        .then(json => setAllLanguages(json))
    }
  })

  function handleChange(value){
    const filters = [];
    if (value !== '') {
      filters.push(value);
    }
    
    if (filters[0].length == 0){
      fetch(Config.websiteServiceUrl + "alumni")
        .then(res => res.json())
        .then(json => setAlumni(json))
    } else if (filters[0] != 0){
        for (let i = 0; i < alumni.length; i++) {
          for (let j = 0; j < alumni[i].languages.length; j++) {
            for (let k = filters.length; k >= 0; k--) {
              if (alumni[i].languages[j] == filters[k]) {
                const filteredAlumni = alumni.filter(x => x.languages[j] == filters[k]);
                console.log(filteredAlumni)
                return setAlumni(filteredAlumni);
      }}}}}
    }

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
                dataSource={alumni}
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