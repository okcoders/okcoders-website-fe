import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf';
import { Table, Divider, Tag, notification } from 'antd';
import { isEmpty } from 'lodash';
import AddClassModal from './modalSubmit.component';

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
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then(json => {
        if (isEmpty(json) && isEmpty(classes)) {
          return;
        }
        setClasses(json);
      })
      .catch(err => {
        notification['error']({
          message: 'Oh No! Something went wrong!',
          description: `Sorry about that! The list of classes was not found.`
        });
      })
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
              <a onClick={() => editRecord(record)}>Edit</a>
              <Divider type="vertical" />
              <a onClick={() => removeFromDb(record._id)}>Delete</a>
            </span>
          )}
        />
      </Table>
      <AddClassModal onUpdate={loadData} onError={handleError} />
    </div>
  );

  function handleError(err) {
    notification['error']({
      message: 'Oh No! Something went wrong!',
      description: `Sorry about that! It will be back up and running in a jiffy! We were unable to add your class to the list.`
    });
  }

  function editRecord(record) {

  }

  function removeFromDb(id) {
    fetch(`${Config.websiteServiceUrl}class/${id}`, {
      method: `DELETE`
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        loadData();
      })
      .catch(err => {
        notification['error']({
          message: 'Oh No! Something went wrong!',
          description: `Sorry about that! This class could not be removed from the list`
        });
      });
  }
}


export { Class };
