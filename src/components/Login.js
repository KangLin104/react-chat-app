
import React, {useRef,useState} from "react";
import {GoogleOutlined, FacebookOutlined} from '@ant-design/icons';
import 'firebase/app';
import {auth} from '../firebase';
import firebase from "firebase/app";
import { useAuth } from '../contexts/AuthContext';
import { Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';

//import forbase and auth (google and facebook)


//set login in front page

export default function Login() {
        const emailRef=useRef(null);
        const passwordRef=useRef(null);
        const {login} = useAuth(null);
        const [error,setError]=useState('');
        const [loading,setLoading]= useState(false);
           
            
        const handleSubmit = async (e) =>{
            e.preventDefault();
            try{
                setError('')
                setLoading(true)
                await login(emailRef.current.value,passwordRef.current.value)
            } catch{
                setError('Fail to Log in')
            }
                setLoading(false)
            
        };
        

    return(
        //login form
        <div id='main-page'>
        <h2 className='title'>ChatMe</h2>
        <div id='main-card'>
            
            <div className='main-form'> 
                
                {error && <Alert varient='danger'>{error}</Alert>}
                <form action="" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input type="email"  placeholder="Email" ref={emailRef} required/>
                    <input type="password" placeholder="Password" ref={passwordRef} required/>
                    <button disabled={loading}>
                    Login</button>
                    <p>Don't have an account? <Link
                    to='/signup'
                    className='Sign-up'>Sign Up</Link>
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
    );
}
