import React, { useState } from 'react';
import Config from '../config/app.local.conf';
import { Button, Modal, Input, Form } from 'antd';

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
        <div>
            <Modal
                visible={visible}
                title="Create a new class"
                okText="Create"
                onCancel={handleCancel}
                onOk={addToClassCollection}
            >
                <Form {...formItemLayout}>

                    <Form.Item label="Title"><Input type='text' name='title' value={title} onChange={e => setTitle(e.target.value)}></Input></Form.Item>
                    <Form.Item label="Year of Class"><Input type='text' name='yearOfClass' value={yearOfClass} onChange={e => setYearOfClass(e.target.value)}></Input></Form.Item>
                    <Form.Item label="Module Number"><Input type='text' name='moduleNumber' value={moduleNumber} onChange={e => setModuleNumber(e.target.value)}></Input></Form.Item>
                    <Form.Item label="Difficulty"><Input type='text' name='difficulty' value={difficulty} onChange={e => setDifficuty(e.target.value)}></Input></Form.Item>
                    <Form.Item label="Languages"><Input type='text' name='tags' value={tags} onChange={e => setTags(e.target.value)}></Input></Form.Item>
                </Form>
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
