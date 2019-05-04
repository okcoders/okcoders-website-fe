import React, { useState, useEffect, ReactDOM } from 'react';
import Config from '../config/app.local.conf';
import { Table, Divider, Tag } from 'antd';
import { isEmpty } from 'lodash';
import AddClassModal from './modalSubmit.component';
import Axios from 'axios';

function Class() {
  const [classes, setClasses] = useState([]);
  const { Column } = Table;

  useEffect(() => {
    if (isEmpty(classes)) {
      loadData();
    }
  })

  const loadData = () => {
    fetch(`${Config.websiteServiceUrl}class`)
      .then(res => res.json())
      .then(json => {
        if (isEmpty(json) && isEmpty(classes)) {
          return;
        }
        setClasses(json);
      });
  }

  return (
    <div>
      <h3>Previous Classes</h3>
      <Table dataSource={classes}>
        <Column
          title="Title"
          dataIndex="title"
          key="title"
        />
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
              {/* <a href="javascript:;">Edit {record.lastName}</a>
              <Divider type="vertical" /> */}
              <a onClick={() => removeFromDb(record._id)}>Delete</a>
            </span>
          )}
        />
      </Table>
      <AddClassModal onUpdate={loadData} />
    </div>
  );

  function removeFromDb(id) {
    fetch(`${Config.websiteServiceUrl}class/${id}`, {
      method: `DELETE`
    })
      .catch(function (error) { console.log(error); })
      .then(res => {
        loadData();
      })
  }
}

export { Class };
