import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
    Form, Input, Row, Col, Button, Layout, Menu, notification, List,
    Select } from 'antd';
import { Redirect } from "react-router-dom";
import Config from '../config/app.local.conf.js';
import { isEmpty } from 'lodash';


function Login(props) {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const { TextArea } = Input;
    const { Header, Content, Footer } = Layout;
    const Option = Select.Option;

    function clearFields() {
        setUserName('');
        setPassword('');
    }


    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    
    if(token){
        return <Redirect to = '/admin' />
    }

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
                    <br />
                    <br />
                    <br />
                    <Form {...formItemLayout} onSubmit={(event, success) => {
                        success = true;
                        event.preventDefault();
                        authenticateUser();
                    }}>
                        <Form.Item
                            label="Username:">
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Input type="text" name="username" value={userName} onChange={e => setUserName(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item
                            label="Password:">
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Input type="text" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </>
    );

    function authenticateUser() {
        const user = {
            username: userName,
            password: password
        }
        Axios.post(Config.websiteServiceUrl + "user/login", user)
            .then(res => {
                clearFields();
                localStorage.setItem("token", res.data.token);
                setToken(res.data.token);
            }).catch(function (error) {
                displayNotificationError(error.response.data);
                clearFields();
            });
        
    }

    function displayNotificationError(error) {
        notification["error"]({
            message: 'Unauthorized User',
            description: error,
        });
        console.log(error);
    };
}

export default Login;