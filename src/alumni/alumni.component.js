import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf.js'
import { List } from 'antd'
import { isEmpty } from 'lodash'

export function Alumni(props) {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    if (isEmpty(alumni)) {
      fetch(Config.websiteServiceUrl + "alumni")
      .then(res => res.json())
      .then(json => setAlumni(json))
    }
  })

  return (
    <div>
    <h3>Alumni</h3>
    <List
      bordered
      dataSource={alumni}
      renderItem={renderAlum}
    />
    </div>
  );
}

function renderAlum(alum) {
  return (
    <List.Item>
    {alum.firstName} {alum.lastName}
    </List.Item>
  )
}
