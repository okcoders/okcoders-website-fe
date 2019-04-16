import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Alumni } from "./alumni/alumni.component.js"


class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Route path="/alumni" exact component={Alumni} />
        </Router>
      </>
    );
  }
}

export default App;
