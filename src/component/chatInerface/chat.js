import React, { useState, useEffect } from 'react';
import socketIO from 'socket.io-client';
import { IoMdSend } from "react-icons/io";
import logo from './logo.png'
import './chat.css';
import {user, room} from '../join/join';
import Message from '../message/message';
import ReactScrollToBottom from 'react-scroll-to-bottom';

// const ENDPOINT = 'http://localhost:4500/';
// const ENDPOINT = 'http://192.168.1.2:4500/';
const ENDPOINT = 'https://anonymetbackend.up.railway.app/';
let socket;
const Chat = () => {
    const [messages, setMessages] = useState([]);
    const sendMsg = ( ) => {
        const message = document.getElementById("msg").value;
        socket.emit("message", {user, message, room});
        document.getElementById("msg").value = "";
    }

    useEffect(() => {
        socket = socketIO(ENDPOINT, {transports: ['websocket']});
        socket.on("connect", () => {
            // alert("Connected");
        })
        if(user.length >2 && room >= 0) socket.emit('joined', {user, room});
        
        return () => {
            socket.emit("discon", {user, room});
            socket.off();
        }
    }, []);

    useEffect(() => {
        socket.on(room, (data) => {
            console.log(data.user, data.msg);
            setMessages(prev => [...prev, {user: data.user, text:data.msg}])
        })
    }, [])

  return (
    <div className='chatContainer'>
        <div className='titleBar'>
            <div className='nameContainer'>
                {/* photo */} <img src={logo} height={40} width={40} alt="logo" />
                <div style={{height:22, position:"relative", top:8, left:5}}><p>{user}</p></div>
            </div>
            <div className='roomContainer'>
                <p style={{fontSize:"0.9rem"}}>Room ID</p>
                <p style={{fontSize:"1.2rem"}}>{room}</p>
            </div>
            
        </div>
      <ReactScrollToBottom className='chatArea'>
        {messages.map((item, index) => (
            <Message key={index} text={item.text} from = {item.user}/>
        ))}
      </ReactScrollToBottom>
      <div className='textArea'>
        <div style={{position:'relative', height:'100%', width:'75%'}}>
            <input type='text' className='inputBox' placeholder='Message' id="msg"/>
        </div>
        <div className='sendButton' onClick={sendMsg}>
        <IoMdSend color={"white"} size={"2rem"} className='btn' />
        </div>
      </div>
    </div>
  )
}

export default Chat
