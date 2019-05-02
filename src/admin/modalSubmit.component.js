import React, { useState } from 'react';
import { Button, Modal, Col, Row } from 'antd';
import Axios from 'axios';




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
                title="Create a new collection"
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

    function addToClassCollection() {
        const newClass = {
            yearOfClass: yearOfClass,
            moduleNumber: moduleNumber,
            tags: tags,
            title: title,
            difficulty: difficulty
        }


        Axios.post('http://localhost:9000/class', { newClass })
            .then(res => {
                setVisible(false);
                console.log(res);
                console.log(res.data);
                props.onUpdate();
            });


    }
}
export default AddClassModal;
