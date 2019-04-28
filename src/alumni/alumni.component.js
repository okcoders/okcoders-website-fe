import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf.js'
import { List, Card, Icon, Avatar, Pagination, Layout, Menu, Dropdown, message } from 'antd'
import { isEmpty } from 'lodash'
import './alumni.component.css';
const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};
const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">HTML</Menu.Item>
    <Menu.Item key="2">CSS</Menu.Item>
    <Menu.Item key="3">JavaScript</Menu.Item>
    <Menu.Item key="4">Backend</Menu.Item>
    <Menu.Item key="5">React</Menu.Item>
    <Menu.Item key="6">Analytics</Menu.Item>
  </Menu>
);

export function Alumni(props) {
  const [alumni, setAlumni] = useState([]);
  

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
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                Filters <Icon type="down"/>
              </a>
            </Dropdown>
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
              <h3>
                <img src="http://static1.squarespace.com/static/55085720e4b0813599644fae/5768549715d5db9b150af935/5936c2f7579fb37c3b11bf62/1496761369468/OKCoders.jpg?format=1500w" style={{ width: '25%' }}></img>
              </h3>
              <List
                grid={{
                  gutter: 16, column: 3
                }}
                bordered
                dataSource={alumni}
                renderItem={renderAlum}
              />
              <div className="pagination">
              <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={1} total={alumni.length} />
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
      actions={[<Icon type="linkedin" onClick={()=> window.open(alum.linkedin)} />, <Icon type="github" onClick={()=> window.open(alum.github)} />, <Icon onClick={()=> window.open(`http://localhost:3000/alumni/${alum.firstName}`)} type="idcard" />]}
    >
    <Meta
      avatar={<Avatar src={alum.avatar} />}
      title={alum.firstName + " " + alum.lastName}
      description={alum.age}
    />
    </Card>
    </List.Item>
    </>
  )
}