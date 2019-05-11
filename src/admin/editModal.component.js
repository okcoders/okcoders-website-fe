import React, { useState } from 'react';
import Config from '../config/app.local.conf';
import { Button, Modal, Form, Input } from 'antd';

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

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

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
                <Form {...formItemLayout}>

                    <Form.Item label="Title"><Input type='text' name='title' value={title} onChange={e => setTitle(e.target.value)}></Input></Form.Item>
                    <Form.Item label="Year of Class"><Input type='text' name='yearOfClass' value={yearOfClass} onChange={e => setYearOfClass(e.target.value)}></Input></Form.Item>
                    <Form.Item label="Module Number"><Input type='text' name='moduleNumber' value={moduleNumber} onChange={e => setModuleNumber(e.target.value)}></Input></Form.Item>
                    <Form.Item label="Difficulty"><Input type='text' name='difficulty' value={difficulty} onChange={e => setDifficuty(e.target.value)}></Input></Form.Item>
                    <Form.Item label="Languages"><Input type='text' name='tags' value={tags} onChange={e => setTags(e.target.value)}></Input></Form.Item>
                </Form>
            </Modal>
            <a onClick={showModal}>Edit</a>
        </span>
    );

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
            })
            .catch(err => {
                props.onError(err)
            });
    }
}
export default EditClassModal;
