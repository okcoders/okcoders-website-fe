import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf.js'
import { List, Card, Icon, Avatar, Layout, Menu } from 'antd'
import { isEmpty } from 'lodash'
import './alumni.component.css';
const { Meta } = Card;
const { Header, Content, Footer } = Layout;

export function Bio(props) {
    const [alumni, setAlumni] = useState([]);
    const [firstName, setFirstName] = useState('Zach');
    const [lastName, setLastName] = useState('Mays');
    const [age, setAge] = useState('sample@gmail.com');
    const [github, setGithub] = useState('sample@gmail.com');
    const [linkedin, setLinkedin] = useState('sample@gmail.com');

    useEffect(() => {
        if (isEmpty(alumni)) {
          fetch(Config.websiteServiceUrl + `alumni`)
          .then(res => res.json())
          .then(json => setAlumni(json))
        }
      });

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
                <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                <h3>
                    <img src="http://static1.squarespace.com/static/55085720e4b0813599644fae/5768549715d5db9b150af935/5936c2f7579fb37c3b11bf62/1496761369468/OKCoders.jpg?format=1500w" style={{ width: '25%' }}></img>
                </h3>
                <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src={alumni.avatar} />}
                    actions={[<Icon type="linkedin" onClick={()=> window.open(alumni.linkedin)} />, <Icon type="github" onClick={()=> window.open(alumni.github)} />]}
                    >
                    <Meta
                    avatar={<Avatar src={alumni.avatar} />}
                    title={alumni.firstName + " " + alumni.lastName}
                    description={alumni.age}
                    />
                    </Card>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
            </Layout>
        </>
    );
    }

    function renderAlumBio(alum) {
    return (
        <>
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
        </>
    )
    }

export default Bio;

