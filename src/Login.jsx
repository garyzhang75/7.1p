import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import './App.css';
import { Link } from 'react-router-dom';
import { signInWithGooglePopup, createUserDocFromAuth, signinAuthUserWithEmailAndPassword } from './utils/firebase';
    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    }
const Login = (props) => {
  const [contact, setContact] = useState({
    email: '',
    password: ''
  });
const {email,password} = contact;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        const response = await signinAuthUserWithEmailAndPassword(email, password);
        console.log(response)
    } catch (error) {
        console.log('Error in creating user:', error.message);
    }
};
  return (
    <div className='header-div'>
      <Input 
        name='email'
        type='text'
        placeholder='email'
        onChange={handleChange}
        value={contact.email}
      />
      <br />

      <Input 
        name='password'
        type='password'
        placeholder='password'
        onChange={handleChange}
        value={contact.password}
      />
      <br />

      <button onClick={handleSubmit}>sign in</button>
      <br />
      <button onClick = {logGoogleUser}>log in with google</button>
       
      <br />
      <br />

      <Link to='/signup'>
        signup
      </Link>
    </div>
  );
};

export default Login;
