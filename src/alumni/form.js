import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
    Form, Input, Row, Col, Button, Layout, Menu, notification,
Select} from 'antd';
import Config from '../config/app.local.conf.js'


function AddAlumniForm(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gitHub, setGitHub] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [bio, setBio] = useState('');

    const { TextArea } = Input;
    const { Header, Content, Footer } = Layout;

    const Option = Select.Option;
    const children = [];


    function clearFields() {
        setFirstName('');
        setLastName('');
        setEmail('');
        setBirthday('');
        setGitHub('');
        setLinkedIn('');
        setBio('');
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

    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
      }
      
      function handleChange(value) {
        console.log(`selected ${value}`);
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
                        addToAlumniCollection();
                    }}>
                        <Form.Item
                            label="First Name:">
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Input type="text" name="firstname" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item
                            label="Last Name:">
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Input type="text" name="lastname" value={lastName} onChange={e => setLastName(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item
                            label="Birthday:" extra="mm/dd/yyyy">
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Input type="text" name="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item
                            label="Email:">
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item
                            label="GitHub:" >
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Input type="text" name="gitHub" value={gitHub} onChange={e => setGitHub(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item
                            label="LinkedIn:" >
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Input type="text" name="linkedin" value={linkedIn} onChange={e => setLinkedIn(e.target.value)} />
                                </Col>
                            </Row>
                        </Form.Item>
                        <Select
                            mode="multiple"
                            style={{ width: '50%' }}
                            placeholder="Please select"
                            defaultValue={['a10', 'c12']}
                            onChange={handleChange}
                        >
                            {children}
                        </Select>
                        <Form.Item>

                        </Form.Item>

                        <Form.Item
                            label="Bio:" >
                            <Row gutter={8}>
                                <Col span={12}>
                                    <TextArea rows={4} type="text" name="bio" value={bio} onChange={e => setBio(e.target.value)} />
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
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
          </Footer>
            </Layout>
        </>
    );


    function addToAlumniCollection(suc) {
        const newAlumni = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            github: gitHub,
            linkedin: linkedIn,
            bio: bio,
            birthday: birthday
        }

        Axios.post(Config.websiteServiceUrl + "alumni", { newAlumni })
            .then(res => {
                console.log(res);
                console.log(res.data);
                clearFields();
            }).catch(function(error) {
                console.log(JSON.stringify(error));
                displayNotificationError(error.response.data);
            });
    }
    
    function displayNotificationError(error) {
        notification["error"]({
            message: 'Please populate folloiwng fields:',
            description: error,
        });
        console.log(error);
    };
}

export default AddAlumniForm;