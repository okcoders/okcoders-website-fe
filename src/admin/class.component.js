import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf.js'
import { List } from 'antd'
import { isEmpty } from 'lodash'

export function Class(props) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (isEmpty(classes)) {
      fetch(Config.websiteServiceUrl + "admin")
        .then(res => res.json())
        .then(json => setClasses(json))
    }
  })

  return (
    <div>
      <h3>Previous Classes</h3>
      <List
        bordered
        dataSource={classes}
        renderItem={renderClass}
      />
    </div>
  );
}

function renderClass(classes) {
  return (
    <List.Item>
      {classes.yearOfClass}
      {classes.moduleNumber}
      {classes.languageTags}
      {classes.title}
      {classes.difficulty}
    </List.Item>
  )
}
