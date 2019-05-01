import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Alumni } from "./alumni/alumni.component.js"
import { Class } from "./admin/class.component.js"
import { AlumniDetail } from "./alumni/alumni-detail.component.js";
import CustomForm from './alumni/form.js';

class App extends Component {
  render() {
    return (
      <>
         <Router>
          <Route path="/alumni" exact component={Alumni} />
          <Route path="/admin" exact component={Class} />
          <Route path="/alumni/:id" exact component={AlumniDetail} />
          <Route path="/addAlumni" exact component={CustomForm} />
        </Router>
      </>
    );
  }
}

export default App;
