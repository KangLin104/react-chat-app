import React, {useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {auth} from '../firebase';

//create and grab context
const AuthContext= React.createContext();

export const useAuth = () => useContext(AuthContext);
// set loading and user state
export const AuthProvider = ({children}) =>{
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();

    function signup(email,password) {
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }


//grab the user state 
    useEffect(() => {
        auth.onAuthStateChanged((user)=> {
            console.log(user);
            setUser(user);
            setLoading(false);
            if(user){
            history.push('/chats');}
        }) 
    }, [user, history]);

const value= {user,login,signup};

return(
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
);
}

