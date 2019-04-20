import React, { useState, useEffect } from 'react';
import Config from '../config/app.local.conf.js'
import { List } from 'antd'
import { isEmpty } from 'lodash'

function Form(props) {

    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [email, setEmail] = useState('sample@gmail.com')

    return (
        <div>
            <form>
                First Name: 
                <input type="text" name="firstname" value={firstName} onChange={e => setFirstName(e.target.value)  }/>
                <br/>
                Last Name:
                <input type="text" name="lastname" value={lastName} onChange={e => setLastName(e.target.value)} />
                <br/>
                Email: 
                <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );

}


function addToAlumniCollection() {
    //This function will post the form data into the okcoders db
}

export default Form;


