import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { Alumni } from "./alumni/alumni.component.js"
import { Class } from "./admin/class.component.js"
import { AlumniDetail } from "./alumni/alumni-detail.component.js";
import AddAlumniForm from './alumni/form.js';

class App extends Component {
  render() {
    return (
      <>
         <Router>
          <Route path="/alumni" exact component={Alumni} />
          <Route path="/admin" exact component={Class} />
          <Route path="/alumni/:id" exact component={AlumniDetail} />
          <Route path="/addAlumni" exact component={AddAlumniForm} />
        </Router>
      </>
    );
  }
}

export default App;
