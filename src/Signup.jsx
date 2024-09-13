import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import './App.css';
import { Link } from 'react-router-dom';
import './Signup.css';
import { createAuthUserWithEmailAndPassword,createUserDocFromAuth} from './utils/firebase'; // Fixed typo

const Signup = (props) => {
    const [contact, setContact] = useState({
        displayName: '',
        email: '', // Corrected 'rmail' to 'email'
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = contact;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContact((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password); // Corrected function name
            await createUserDocFromAuth(user, {displayName});
        } catch (error) {
            console.log('Error in creating user:', error.message);
        }
    };

    return (
        <div className="header-div">
            <Input
                name="displayName"
                type="text"
                placeholder="Display Name"
                onChange={handleChange}
                value={contact.displayName}
            />
            <br />

            <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={contact.email}
            />
            <br />

            <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={contact.password}
            />
            <br />

            <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={contact.confirmPassword}
            />
            <br />

            <button onClick={handleSubmit}>Sign up</button>
            <br />
            <br />

            <Link className="link" to="/login">
                Login
            </Link>
        </div>
    );
};

export default Signup;
