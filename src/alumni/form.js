import React, { useState, useEffect } from 'react';
import Axios from 'axios';
//import Config from '../config/app.local.conf.js'
//import { List } from 'antd'
//import { isEmpty } from 'lodash'

function Form(props) {

    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [email, setEmail] = useState('sample@gmail.com');
    const [gitHub, setGitHub] = useState('sample@gmail.com');
    const [linkedIn, setLinkedIn] = useState('sample@gmail.com');

    return (
        <div>
            <form onSubmit={event => {
                    event.preventDefault();
                    addToAlumniCollection(); }}>
                First Name:  
                <input type="text" name="firstname" value={firstName} onChange={e => setFirstName(e.target.value)  }/>
                <br/>
                Last Name:
                <input type="text" name="lastname" value={lastName} onChange={e => setLastName(e.target.value)} />
                <br/>
                Email: 
                <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                <br/>
                GitHub: 
                <input type="text" name="gitHub" value={gitHub} onChange={e => setGitHub(e.target.value)} />
                <br/>
                LinkedIn: 
                <input type="text" name="linkedin" value={linkedIn} onChange={e => setLinkedIn(e.target.value)} />
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );


function addToAlumniCollection(){

        const newAlumni = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            github: gitHub,
            linkedin: linkedIn
        }

        
        Axios.post('http://localhost:9000/alumni', {newAlumni} )
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
        

}
}

export default Form;


