import React,{useEffect, useState} from 'react'
import {db} from './firebaseConfiguration'
import {ref,onValue,set} from 'firebase/database'
import { useSearchParams } from 'react-router-dom';
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import style from './chatbox.module.css'
import sendIcon from './send2.png'
import { useNavigate } from 'react-router-dom';
function Chatbox(){
  const navigate=useNavigate();
  const [sp,ssp]=useSearchParams();
  const [data,setData]=useState([]);
  // const [roomCode,setRoomCode]=useState("");
  const [newMessage,setNewMessage]=useState("");
  const [dataCount,setDataCount]=useState(0)
  const getData=()=>{
    const dbref=ref(db,sp.get('room'));
    ssp({"uname":sp.get('uname'),"room":sp.get('room')});
     onValue(dbref,(snapshot)=>{
      let records=[]
      snapshot.forEach(childSnapshot=>{
        let uname=childSnapshot.val().uname
        let message=childSnapshot.val().message
        records.push([parseInt(childSnapshot.key),uname,message])
      })
      setDataCount(records.length)
      records = records.sort((a, b) => a[0] - b[0]);
      console.log(records)
      setData(records);
      
    })
  }
  const sendMessage=async()=>{
    if(!newMessage)return;
    await set(ref(db,sp.get('room')+"/"+dataCount),{
      uname:sp.get('uname'),  
      message:newMessage
    })

  }

  useEffect(()=>{
    getData()
      console.log(dataCount)
  },[])

  return (
    <div className={style.chatpage}>
    <div className={style.chatbox}>
    <div className={style.messages}>
        {
          data.map((mess)=>
            <h3 className={style.mess}><span style={{color:'greenyellow'}}>{mess[1]+": "}</span><span style={{color:'white'}}>{mess[2]}</span></h3>
          )
        }
    </div>
        <div className={style.messenger}>
          <input type="text" placeholder='Message...' className={style.messageBox} onChange={(e)=>setNewMessage(e.target.value)}/>
          <div className={style.sendButton} onClick={()=>sendMessage()}>
            <img src={sendIcon} alt="sendIcon"/>
          </div>

        </div>
    </div>
    <Button onClick={()=>navigate('/')}>Sign Out</Button>
    </div>
  )
}

export default Chatbox;