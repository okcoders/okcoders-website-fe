import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf';
import { Table, Divider, Tag } from 'antd';
import { isEmpty } from 'lodash';
import CollectionsPage from './modalSubmit.component';

export function Class(props) {
  const [classes, setClasses] = useState([]);
  const { Column, CoumnGroup } = Table;

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
      <Table dataSource={classes}>
        <Column
          title="Year Of Class"
          dataIndex="yearOfClass"
          key="yearOfClass"
        />
        <Column
          title="Module Number"
          dataIndex="moduleNumber"
          key="moduleNumber"
        />
        <Column
          title="Title"
          dataIndex="title"
          key="title"
        />
        <Column
          title="Difficulty"
          dataIndex="difficulty"
          key="difficulty"
        />
        <Column
          title="Languages"
          dataIndex="languageTags"
          key="languageTags"
          render={tags => (
            <span>
              {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
            </span>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <a href="javascript:;">Edit {record.lastName}</a>
              <Divider type="vertical" />
              <a href="javascript:;">Delete</a>
            </span>
          )}
        />
      </Table>
      <h3>Add New </h3>
    </div>
  );
}
