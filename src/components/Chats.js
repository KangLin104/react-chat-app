import React, {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';
import {useAuth} from '../contexts/AuthContext';
import axios from 'axios';


const Chats = () =>{

    const history=useHistory();
    const {user} = useAuth();
    const [loading,setLoading]= useState(true);
   
    const handleLogout= async () =>{
        await auth.signOut();
        history.push('/login');
    }

    const getFile= async (url) => {
        const response=await fetch(url);
        const data=await response.blob();

        return new File([data], 'userPhoto.jpg', {type: 'image/jpeg'})
    }

    useEffect(() => {
        if(!user){
            history.push('/login');
            return;
        }

        axios.get('https://api.chatengine.io/users/me/',
            {
                headers:{
                    'project-id':'6b9005e7-b61d-44f3-bc3a-7dbb0f51fe8f',
                    'user-name': user.email,
                    'user-secret': user.uid,

                }
            }
        )

        .then(() =>{
            setLoading(false);
        })

        .catch(() =>{
            let formdata=new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) =>{
                    if(user.photoURL!==null){
                        formdata.append('avatar',avatar, avatar.name)

                    }
                    
                    axios.post('https://api.chatengine.io/users/',
                        formdata,
                        {headers: {'private-key': '8a6b8d58-fd50-48fe-b516-bee8c0dca2a2' }}
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })
    }, [user,history])

    if(!user || loading) return 'Loading...';
    return(
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    ChatMe
                </div>
                <div onClick={handleLogout} className='logout-tab'>
                    Logout
                </div>
            </div>
            <ChatEngine
                height='calc(100vh - 66px)'
                projectID='6b9005e7-b61d-44f3-bc3a-7dbb0f51fe8f'
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}
export default Chats