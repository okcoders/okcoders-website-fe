import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf.js'
import { List, Card, Icon, Avatar, Pagination, Layout, Menu, Select } from 'antd'
import { isEmpty } from 'lodash'
import './alumni.component.css';
const { Meta } = Card;
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
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">Alumni</Menu.Item>
              <Menu.Item key="2">Submit</Menu.Item>
              <Menu.Item key="3">Verification</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <div style={{ width: '100%' }}>
            <h3>
                <img src="http://static1.squarespace.com/static/55085720e4b0813599644fae/5768549715d5db9b150af935/5936c2f7579fb37c3b11bf62/1496761369468/OKCoders.jpg?format=1500w" 
                style={{ width: '25%' }}>
                </img>
              </h3>
              </div>
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
    <Card
      style={{ width: 300 }}
      cover={<img alt="example" src={alum.avatar} />}
      actions={[
        <Icon type="linkedin" onClick={()=> window.open(alum.linkedin)} />, 
        <Icon type="github" onClick={()=> window.open(alum.github)} />, 
        <Icon onClick={()=> window.open(alum._id)} type="idcard" />]}
    >
    <Meta
      avatar={<Avatar src={alum.avatar} />}
      title={alum.firstName + " " + alum.lastName}
      description={alum.age}
    />
    </Card>
    {alum.firstName} {alum.lastName}
    </List.Item>
    </>
  )
}