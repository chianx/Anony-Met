import React, {useState} from 'react'
import "./join.css";
import {Link, useNavigate} from 'react-router-dom';

let user = "";
let room = "";

const handleJoin = () => {
    user = document.getElementById("name").value;
    room = document.getElementById("room").value;
    document.getElementById("room").value = "";
    document.getElementById("name").value = "";
}



const Join = () => {
    const [name, setName] = useState("");
    const [roomID, setRoomID] = useState("");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const joinRandom = async() => {
        user = document.getElementById("name").value;
        document.getElementById("name").value = "";
        // const response = await fetch('http://localhost:4500/getRandomRoom');
        const response = await fetch('http://192.168.1.2:4500/getRandomRoom');
        const data = await response.json();
        room = data.roomID;
        console.log("roomm = ", room);
        if(room >= 0) navigate('/chat');
        if(room === -1) setShow(true);
    }
  return (
    <div>
    <div className='container'>
        <div className='head'>
            <h1 className='texthead'>Anony met</h1>
        </div>
        
        <div className='insideContainer' >
            <div style={{width:'80%'}}>
                <input onChange={(e) => setName(e.target.value)} placeholder='Enter your name' type="text" id="name" className='inputbox'/>
            </div>
            <div style={{width:'80%'}}>
                <input onChange={(e) => setRoomID(e.target.value)} placeholder='Room ID' type="num" id="room" className='inputbox'/>
            </div>

            {roomID.length > 3? 
                <div onClick={handleJoin} className='button'>
                    <Link onClick={(event) => name === ""? event.preventDefault() : null} to="/chat">
                    <h4 style={{color:'white', fontSize:'1.2rem'}}>Join Now</h4>
                    </Link>   
                </div>
            :
                <div onClick={joinRandom} className='button'>
                    <h4 style={{color:'white', fontSize:'1.2rem'}}>Join Random</h4>
                </div>
            }
            {show? 
            <div style={{color:'red', marginTop:5}}>No rooms available. Try again later</div>
            : <></>}
        </div>
    </div>
    
    </div>
  )
}

export default Join;
export {user , room};
