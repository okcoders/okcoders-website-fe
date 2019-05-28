import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf';
import { Table, Divider, Tag, notification, Input, List, Button, Icon, Modal } from 'antd';
import { isEmpty } from 'lodash';
import AddClassModal from './modalSubmit.component';
import EditClassModal from './editModal.component';

function Class() {
  const [classes, setClasses] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState();
  const [newLanguage, setNewLanguage] = useState('');
  const { Column } = Table;
  const [languageProcessing, setLanguageProcessing] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  }

  useEffect(() => {
    if (isEmpty(classes)) {
      loadData();
    }
  })

  const loadData = () => {
    Promise.all([fetch(`${Config.websiteServiceUrl}language`), fetch(`${Config.websiteServiceUrl}class`), fetch(`${Config.websiteServiceUrl}alumni?verified=false`)])
      .then(values => {
        const [languages, newClasses, alumni] = values;
        return Promise.all([languages.json(), newClasses.json(), alumni.json()])
      })
      .then(values => {
        const [languages, newClasses, alumni] = values;
        if (isEmpty(newClasses) && isEmpty(classes)) {
          return;
        }
        setAlumni(alumni);
        setClasses(newClasses);
        setAllLanguages(languages);
      })
      .catch(err => {
        notification['error']({
          message: 'Oh No! Something went wrong!',
          description: `Sorry about that! The data was not found.`
        });
      })
  }



  function saveNewLanguage(e) {
    if (!newLanguage) {
      return
    }
    setLanguageProcessing(true);
    handleInputConfirm()
      .then(() => {
        setNewLanguage('');
        setLanguageProcessing('');
        loadData();
      })
    //call server

  }

  return (
    <>
      <div>
        <h3 style={{ margin: '16px 0' }}>Languages</h3>
        <List
          bordered
          dataSource={allLanguages}
          renderItem={l => (
            <List.Item>
              {l.language}
              <Icon type="close-circle" onClick={() => removeLanguage(l._id)} />
            </List.Item>
          )}
        />
        <Input placeholder="Enter a new language" value={newLanguage} onChange={e => setNewLanguage(e.target.value)} />
        <Button type="primary" onClick={saveNewLanguage} disabled={languageProcessing}>New Language</Button>
      </div>
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
                <a onClick={() => removeClass(record._id)}>Delete</a>
              </span>
            )}
          />
        </Table>
        <AddClassModal languages={allLanguages} onUpdate={loadData} onError={handleError} />
      </div >
      <div>
        {/* MAKE THIS INTO A TABLE */}
        {/* CREATE BUTTONS TO ACCEPT OR DENY */}
        <h3 style={{ margin: '16px 0' }}>Confirm New Alumni</h3>
        <List
          bordered
          dataSource={alumni}
          renderItem={a => (
            <List.Item>
              {`${a.firstName} ${a.lastName}`}
              <Button type="primary" onClick={showModal()}>
                Open Modal
               </Button>
              <Modal
                title="Basic Modal"
                visible={visible}
                onCancel={handleCancel}
                onOk={handleCancel}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
              {/* <Button onClick={() => removeAlumni(l._id)}>
              X
              </Button> */}
            </List.Item>
          )}
        />
      </div>
    </>
  );

  // WRITE FUNCTION TO HANDLE ACCEPTED ALUMNI
  // WRITE FUNCTION TO HANDLE DENIED ALUMNI

  function handleError(err) {
    notification['error']({
      message: 'Oh No! Something went wrong!',
      description: `Sorry about that! It will be back up and running in a jiffy! We were unable to add your class to the list.`
    });
  }

  function handleInputConfirm() {
    const payload = {
      language: newLanguage
    }

    return fetch(`${Config.websiteServiceUrl}language`, {
      method: `POST`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
      })
      .catch(err => {
        handleError()
      });
  }

  function showModal() {
    setVisible(true);
    console.log('here');
  };


  function removeLanguage(id) {
    fetch(`${Config.websiteServiceUrl}language/${id}`, {
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
          description: `Sorry about that! This language could not be removed from the list`
        });
      });
  }

  function removeClass(id) {
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
