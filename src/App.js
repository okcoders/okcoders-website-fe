import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Alumni } from "./alumni/alumni.component.js"
import { Class } from "./admin/class.component.js"
import { Bio } from "./alumni/bio.js"


class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Route path="/alumni" exact component={Alumni} />
          <Route path="/admin" exact component={Class} />
          <Route path="/alumni/:firstName" exact component={Bio} />
        </Router>
      </>
    );
  }
}

export default App;
