import React, { useState } from 'react';
import Config from '../config/app.local.conf';
import { Button, Modal, Col, Row } from 'antd';

function EditClassModal(props) {

    const [visible, setVisible] = useState(false);
    const [id] = useState(props.record._id);
    const [yearOfClass, setYearOfClass] = useState(props.record.yearOfClass);
    const [moduleNumber, setModuleNumber] = useState(props.record.moduleNumber);
    const [tags, setTags] = useState(props.record.languageTags.join(', '));
    const [title, setTitle] = useState(props.record.title);
    const [difficulty, setDifficuty] = useState(props.record.difficulty);

    const showModal = () => {
        setVisible(true);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    return (
        <span>
            <Modal
                visible={visible}
                title="Create a new class"
                okText="Create"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>Cancel</Button>,
                    <Button key="submit" type="primary" onClick={UpdateClass}>
                        Update
                    </Button>,
                ]}
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
            <a onClick={showModal}>Edit</a>
        </span>
    );

    function clearFields() {
        setYearOfClass('');
        setDifficuty('');
        setModuleNumber('');
        setTags('');
        setTitle('');
    }



    function UpdateClass() {
        const record = {
            _id: id,
            yearOfClass: yearOfClass,
            moduleNumber: moduleNumber,
            tags: tags,
            title: title,
            difficulty: difficulty
        }

        fetch(`${Config.websiteServiceUrl}class`, {
            method: `PUT`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
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
export default EditClassModal;
