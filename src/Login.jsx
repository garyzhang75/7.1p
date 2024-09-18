import React, { useState } from 'react';
import Input from './Input';
import './App.css';
import { Link } from 'react-router-dom';
import { signInWithGooglePopup, createUserDocFromAuth, signinAuthUserWithEmailAndPassword } from './utils/firebase';
import './Login.css'
const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
};

const Login = () => {
    const [contact, setContact] = useState({
        email: '',
        password: ''
    });

    const { email, password } = contact;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContact((preValue) => ({
            ...preValue,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signinAuthUserWithEmailAndPassword(email, password);
            console.log(response);
        } catch (error) {
            console.log('Error in creating user:', error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="signup-link">
                <Link to='/signup'>Sign up</Link>
            </div>

            <div className="login-box">
                <form className="login-form" onSubmit={handleSubmit}>
                    <label>Your email</label>
                    <Input 
                        name='email'
                        type='text'
                        placeholder='email'
                        onChange={handleChange}
                        value={contact.email}
                    />
                    <label>Your password</label>
                    <Input 
                        name='password'
                        type='password'
                        placeholder='password'
                        onChange={handleChange}
                        value={contact.password}
                    />
                    <button type="submit" className="login-btn">Login</button>
                </form>

                <button onClick={logGoogleUser} className="google-login-btn">Log in with Google</button>
                <hr/>
                <Link  to='/signup'>
                  signup
                </Link>
            </div>
        </div>
    );
};

export default Login;


