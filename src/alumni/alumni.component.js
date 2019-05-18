import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf.js'
import { List, Card, Icon, Avatar, Pagination, Layout, Menu, Select } from 'antd'
import { isEmpty } from 'lodash'
import './alumni.component.css';
import { NavBar } from './NavBar.component'
import { Logo } from './OKCoderLogo.component'
import { AlumniCard } from './AlumniCard.component'
const { Header, Content, Footer } = Layout;
const Option = Select.Option;

// in case we need to loop through classes later
// const children = [];
// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }

export function Alumni(props) {
  const [alumni, setAlumni] = useState([]);
  
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  useEffect(() => {
    if (isEmpty(alumni)) {
      fetch(Config.websiteServiceUrl + "alumni")
        .then(res => res.json())
        .then(json => setAlumni(json))
    }
  })

  return (
      <>
        <Layout>
          <NavBar/>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Logo/>
              <div>
              <Select
                mode="tags"
                className= "multiselect"
                style={{ width: '25%' }}
                placeholder="Tags Mode"
                onChange={handleChange}
                >
                <Option key="HTML">HTML</Option>
                <Option key="CSS">CSS</Option>
                <Option key="JavaScript">JavaScript</Option>
                <Option key="Backend">Backend</Option>
                <Option key="React">React</Option>
                <Option key="Analytics">Analytics</Option>
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
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
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