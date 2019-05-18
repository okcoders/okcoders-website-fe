import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf';
import { Table, Divider, Tag, notification } from 'antd';
import { isEmpty } from 'lodash';
import AddClassModal from './modalSubmit.component';
import EditClassModal from './editModal.component';

function Class() {
  const [classes, setClasses] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const { Column } = Table;

  useEffect(() => {
    if (isEmpty(classes)) {
      loadData();
    }
  }, [])

  const loadData = () => {
    Promise.all([fetch(`${Config.websiteServiceUrl}language`), fetch(`${Config.websiteServiceUrl}class`)])
      .then(values => {
        const [languages, newClasses] = values;
        return Promise.all([languages.json(), newClasses.json()])
      })
      .then(values => {
        const [languages, newClasses] = values;
        if (isEmpty(newClasses) && isEmpty(classes)) {
          return;
        }

        setClasses(newClasses);
        setAllLanguages(languages);
      })
      .catch(err => {
        notification['error']({
          message: 'Oh No! Something went wrong!',
          description: `Sorry about that! The list of classes or languages was not found.`
        });
      })
  }

  return (
    < div >
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
          dataIndex="languages"
          key="languages"
          render={languages => {
            return (
              < span >
                {languages.map(language => {
                  return <Tag color="blue" key={language.language}>{language.language}</Tag>
                })}
              </span>
            )
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <EditClassModal languages={allLanguages} record={record} onUpdate={loadData} onError={handleError} />
              <Divider type="vertical" />
              <a onClick={() => removeFromDb(record._id)}>Delete</a>
            </span>
          )}
        />
      </Table>
      <AddClassModal languages={allLanguages} onUpdate={loadData} onError={handleError} />
    </div >
  );

  function handleError(err) {
    notification['error']({
      message: 'Oh No! Something went wrong!',
      description: `Sorry about that! It will be back up and running in a jiffy! We were unable to add your class to the list.`
    });
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
