import React from "react"
import ChatList from "./ChatList"
import './css/Chat.css'
import ChatWindow from "./ChatWindow"

export default function Chat() {
    // const [open, setOpen] = React.useState(false);
    // const [opendos, setOpendos] = React.useState(false);
  
    return (
      <>
      <div className='Chat' >
    
        <ChatList/>
        <ChatWindow/>
      </div>
      </>
  )
}