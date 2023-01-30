import React,{useState} from 'react';
import Style from './signinPage.module.css'
import { useNavigate } from 'react-router-dom';
function SigninPage(){
  const navigate=useNavigate();
  const [name,setName]=useState("");
  const [roomCode,setRoomCode]=useState("");
  const enterChat=()=>{
    if(name && roomCode){navigate(`/chatbox?room=${roomCode}&uname=${name}`)}
    else alert("enter details");return;
  }
    return(
      <div className={Style.signin}>
        <input type="text" placeholder='Enter name' onChange={(e)=>setName(e.target.value)}/>
        <input type="text" placeholder='Room Code' onChange={(e)=>setRoomCode(e.target.value)}/>
        
        <button onClick={enterChat} className={Style.signinButton}>Enter Chat</button>
      </div>
    )
}
export default SigninPage;