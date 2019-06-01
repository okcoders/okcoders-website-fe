import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter } from 'react-router';
import "antd/dist/antd.css";
import './alumni/alumni.component.css';
import { Alumni } from "./alumni/alumni.component.js"
import { Class } from "./admin/class.component.js"
import { AlumniDetail } from "./alumni/alumni-detail.component.js";
import AddAlumniForm from './alumni/form.js';
import { NavBar } from './alumni/NavBar.component';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    const Nav = withRouter(NavBar)
    return (
      <>
         <Router>
          <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <Nav/>
            </Header>
            <Content style={{ padding: '0 75px', marginTop: 24 }} className="content">
              <Route path="/alumni" exact component={Alumni} />
              <Route path="/admin" exact component={Class} />
              <Route path="/alumni/:id" exact component={AlumniDetail} />
              <Route path="/addAlumni" exact component={AddAlumniForm} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Router>
      </>
    );
  }
}

export default App;
