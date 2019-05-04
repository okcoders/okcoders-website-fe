import React, { useState } from 'react';
import Config from '../config/app.local.conf';
import { Button, Modal, Col, Row, notification } from 'antd';

function AddClassModal(props) {

    const [visible, setVisible] = useState(false);
    const [yearOfClass, setYearOfClass] = useState();
    const [moduleNumber, setModuleNumber] = useState();
    const [tags, setTags] = useState();
    const [title, setTitle] = useState();
    const [difficulty, setDifficuty] = useState();

    const showModal = () => {
        setVisible(true);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    return (
        <div>
            <Modal
                visible={visible}
                title="Create a new class"
                okText="Create"
                onCancel={handleCancel}
                onOk={addToClassCollection}
            >
                <Row>
                    <Col span={6}>Title:</Col>
                    <Col span={12}><input type='text' placeholder='Title' name='title' value={title} onChange={e => setTitle(e.target.value)}></input></Col>
                </Row>
                <Row>
                    <Col span={6}>Year of Class:</Col>
                    <Col span={16}><input type='text' placeholder='Year of Class' name='yearOfClass' value={yearOfClass} onChange={e => setYearOfClass(e.target.value)}></input></Col>
                </Row>
                <Row>
                    <Col span={6}>Module Number:</Col>
                    <Col span={12}><input type='text' placeholder='Module Number' name='moduleNumber' value={moduleNumber} onChange={e => setModuleNumber(e.target.value)}></input></Col>
                </Row>
                <Row>
                    <Col span={6}>Difficulty:</Col>
                    <Col span={12}><input type='text' placeholder='Difficulty' name='difficulty' value={difficulty} onChange={e => setDifficuty(e.target.value)}></input></Col >
                </Row>
                <Row>
                    <Col span={6}>Language:</Col>
                    <Col span={12}><input type='text' placeholder='Languages' name='tags' value={tags} onChange={e => setTags(e.target.value)}></input></Col>
                </Row>
            </Modal>
            <Button type="primary" onClick={showModal}>New Collection</Button>
        </div >
    );

    function clearFields() {
        setYearOfClass('');
        setDifficuty('');
        setModuleNumber('');
        setTags('');
        setTitle('');
    }



    function addToClassCollection() {
        const newClass = {
            yearOfClass: yearOfClass,
            moduleNumber: moduleNumber,
            tags: tags,
            title: title,
            difficulty: difficulty
        }

        fetch(`${Config.websiteServiceUrl}class`, {
            method: `POST`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newClass)
        })
            .then(res => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                setVisible(false);
                props.onUpdate();
                clearFields();
            })
            .catch(err => {
                props.onError(err)
            });
    }
}
export default AddClassModal;
