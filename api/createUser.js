import axios from 'axios';

const createUser = async (req,res) =>{
    const{userId, userName} = req.body;

    axios.post('https://api.chatengine.io/projects/people/',
    {username:userName, secretId:userId},
    {headers:{'Private-Key':process.env.chat_engine_private_key}})
}

export default createUser;