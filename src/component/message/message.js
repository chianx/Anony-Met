import React from 'react'
import {user, room} from '../join/join';
import './message.css'

const Message = ({text, from}) => {
  return (
    <div className='msgContainer'>
        {from === user?
         <div className='message right'>{text}</div> 
         :
         from === "Admin"?
         <div className='message mid'>{text}</div> 
         :
         <div className='message left'><div className='fromText'>{from}</div>{text}</div>
        }
    </div>
  )
}

export default Message