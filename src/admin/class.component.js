import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf';
import { Table, Divider, Tag, notification, Input, List, Button, Icon, Modal, Row, Col } from 'antd';
import { isEmpty } from 'lodash';
import AddClassModal from './modalSubmit.component';
import EditClassModal from './editModal.component';
import baseHeaders from '../utils/baseHeaders';
import styled from 'styled-components';

function Class() {
  const [classes, setClasses] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');
  const { Column } = Table;
  const [languageProcessing, setLanguageProcessing] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState({});
  const buildConfig = baseHeaders(localStorage.token);

  const H3 = styled.h3`
    margin: 48px 0 0 0;
  `;
  
  const StyledButton = styled(Button)`
    margin-left: 10px; 
    float: right;
  `;

  const StyledIcon = styled(Icon)`
    float: right;  
  `

  const handleCancel = () => {
    setVisible(false);
  }

  useEffect(() => {
    if (isEmpty(classes)) {
      loadData();
    }
  })

  const loadData = () => {
    Promise.all([fetch(`${Config.websiteServiceUrl}language`), fetch(`${Config.websiteServiceUrl}class`), fetch(`${Config.websiteServiceUrl}alumni?verified=false`, buildConfig({}))])
      .then(values => {
        const [languages, newClasses, alumni] = values;
        return Promise.all([languages.json(), newClasses.json(), alumni.json()])
      })
      .then(values => {
        const [languages, newClasses, alumni] = values;
        if (isEmpty(newClasses) && isEmpty(classes)) {
          return;
        }
        setClasses(newClasses);
        setAllLanguages(languages);
        setAlumni(alumni);
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
  }

  return (
    <>
      <Row>
        <Col span={11}>
          <div>
            <H3>Languages</H3>
            <List
              bordered
              dataSource={allLanguages}
              renderItem={l => (
                <List.Item>
                  {l.language}
                  <StyledIcon type="close-circle" onClick={() => removeLanguage(l._id)} />
                </List.Item>
              )}
            />
            <Input placeholder="Enter a new language" value={newLanguage} onChange={e => setNewLanguage(e.target.value)} />
            <Button type="primary" onClick={saveNewLanguage} disabled={languageProcessing}>New Language</Button>
          </div>
        </Col>
        <Col span={1} />
        <Col span={11}>
          <span>
            <Modal
              title="Basic Modal"
              visible={visible}
              onCancel={handleCancel}
              onOk={handleCancel}
            >
              <p>Age: {selectedAlumni.age}</p>
              <p>Email: {selectedAlumni.email}</p>
              <p>Github Profile: {selectedAlumni.github}</p>
              <p>Linked In Profile: {selectedAlumni.linkedin}</p>
              <p>Classes taken: {(selectedAlumni.languages || []).join(', ')}</p>
            </Modal>
            <H3>Confirm New Alumni</H3>
            <List
              bordered
              dataSource={alumni}
              renderItem={a => (
                <List.Item>
                  {`${a.firstName} ${a.lastName}`}
                  <StyledButton type="primary" onClick={() => showModal(a)}>
                    More Info
               </StyledButton>
                  <StyledButton onClick={() => acceptAlumni(a)}>Accept</StyledButton>
                  <StyledButton onClick={() => declineAlumni(a._id)}>Decline</StyledButton>
                </List.Item>
              )}
            />
          </span>
        </Col>
      </Row>
      < div >
        <H3>Previous Classes</H3>
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

    </>
  );

  function acceptAlumni(alumni) {
    alumni.verified = true;
    fetch(`${Config.websiteServiceUrl}alumni`, buildConfig({
      method: `PUT`,
      body: JSON.stringify(alumni)
    }))
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        loadData();
      })
      .catch(err => {
        notification['error']({
          message: 'Oh No! Something went wrong!',
          description: `Sorry about that! This alumni could not be removed from the list`
        });
      });
  }
  function declineAlumni(id) {
    fetch(`${Config.websiteServiceUrl}alumni/${id}`, buildConfig({
      method: `DELETE`
    }))
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        loadData();
      })
      .catch(err => {
        notification['error']({
          message: 'Oh No! Something went wrong!',
          description: `Sorry about that! This alumni could not be removed from the list`
        });
      });
  }

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

    return fetch(`${Config.websiteServiceUrl}language`, buildConfig({
      method: `POST`,
      body: JSON.stringify(payload)
    }))
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
      })
      .catch(err => {
        handleError()
      });
  }

  function showModal(alumni) {
    setSelectedAlumni(alumni);
    setVisible(true);
  };


  function removeLanguage(id) {
    fetch(`${Config.websiteServiceUrl}language/${id}`, buildConfig({
      method: `DELETE`
    }))
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
    fetch(`${Config.websiteServiceUrl}class/${id}`, buildConfig({
      method: `DELETE`
    }))
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
