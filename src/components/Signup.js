import React, {useRef, useState} from 'react';
import {GoogleOutlined, FacebookOutlined} from '@ant-design/icons';
import 'firebase/app';
import {auth} from '../firebase';
import firebase from "firebase/app";
import { useAuth } from '../contexts/AuthContext';
import { Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default function Signup(){
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();
    const {signup} = useAuth();
    const [error,setError]=useState('');
    const [loading,setLoading]= useState(false)
    
    //sign up button function

    async function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value ){
            return setError('password do not match')
        }
        

        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value,passwordRef.current.value)
        } catch{
            setError('Fail to create an account')
        }
            setLoading(false)
        
    }
    
    return(
        //sign up form
        <div id='main-page'>
        <h2 className='title'>ChatMe</h2>
        <div id='main-card'>
            
            <div className='main-form'> 
                
                {error && <Alert varient='danger'>{error}</Alert>}
                <form action="" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <input type="email"  placeholder="Email" ref={emailRef} required/>
                    <input type="password" placeholder="Password" ref={passwordRef} required/>
                    <input type="password"  placeholder=" Password Confirmation" ref={passwordConfirmRef} required/>
                    <button disabled={loading} onClick={() => auth.signInWithRedirect(new firebase.auth.EmailAuthProvider())}>Sign Up</button>
                    <p>Have an account? <Link
                    to='/login'
                    className='Sign-up'>Log In</Link>
                    </p>
                </form>
            </div> 
        
            <div className='login-seprate'>
                <p>Or login with</p>
            </div>
            
            <div className='login-button google' 
                onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                <GoogleOutlined/> Google
            </div>
                
                
            <div className='login-button facebook'
                onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}>
                <FacebookOutlined/> Facebook
            </div>
        </div>
    </div>
    )
}
