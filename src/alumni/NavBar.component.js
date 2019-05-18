import React from 'react';
import { Layout, Menu } from 'antd'
import './alumni.component.css';
const { Header } = Layout;

export function NavBar(props) {
    return (
        <>
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
              <Menu.Item key="3">Admin</Menu.Item>
            </Menu>
          </Header>
          </>)}