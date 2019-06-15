import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd'
import './alumni.component.css';

export function NavBar(props) {
  const [auth, setAuth] = useState(localStorage.getItem('token') || '');
  const authLinks = (
    <>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[props.location.pathname]}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="/alumni">
          <Link to="/alumni">Alumni</Link>
        </Menu.Item>
        <Menu.Item key="/addAlumni">
          <Link to="/addAlumni">Submit</Link>
        </Menu.Item>
        <Menu.Item key="/admin">
          <Link to="/admin">Admin</Link>
        </Menu.Item>
      </Menu>
    </>
  )

  const guestLinks = (
    <>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[props.location.pathname]}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="/alumni">
          <Link to="/alumni">Alumni</Link>
        </Menu.Item>
        <Menu.Item key="/addAlumni">
          <Link to="/addAlumni">Submit</Link>
        </Menu.Item>
        <Menu.Item key="/admin">
          <Link to="/admin">Login</Link>
        </Menu.Item>
      </Menu>
    </>
  )
  return (
    <>
      {auth ? authLinks : guestLinks}
    </>
  )
}