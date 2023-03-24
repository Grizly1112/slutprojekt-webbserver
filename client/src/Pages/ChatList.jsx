import { useState } from 'react';
import './css/ChatList.css';


function ChatList() {


    const messageArray = [
        {
        name: "Grizly",
        status: true,
        pfp: "https://cdn.discordapp.com/avatars/431824979554992132/3a3e21c61bed5e4cf147e7b64d79d441.webp?size=32",
        text:"MAMAMAMGAMGAGMAGMAGMAGMAGMMAGAGM"
    },{

        name: "Grizly",
        status: true,
        pfp: "https://cdn.discordapp.com/avatars/431824979554992132/3a3e21c61bed5e4cf147e7b64d79d441.webp?size=32",
        text:"MAMAMAMGAMGAGMAGMAGMAGMAGMMAGAGM"

    },{

        name: "Grizly",
        status: true,
        pfp: "https://cdn.discordapp.com/avatars/431824979554992132/3a3e21c61bed5e4cf147e7b64d79d441.webp?size=32",
        text:"MAMAMAMGAMGAGMAGMAGMAGMAGMMAGAGM"

    },{

        name: "Grizly",
        status: true,
        pfp: "https://cdn.discordapp.com/avatars/431824979554992132/3a3e21c61bed5e4cf147e7b64d79d441.webp?size=32",
        text:"MAMAMAMGAMGAGMAGMAGMAGMAGMMAGAGM"

    },{

        name: "Grizly",
        status: true,
        pfp: "https://cdn.discordapp.com/avatars/431824979554992132/3a3e21c61bed5e4cf147e7b64d79d441.webp?size=32",
        text:"MAMAMAMGAMGAGMAGMAGMAGMAGMMAGAGM"

    }];

    const Message = (props) => {


        return(
            <>
             <div className="dm">
                <div className="messageContainer">
                    <div className="profileContent">
                        <div className="pfp">
                            <img src={props.pfp} alt="" />
                            <div className="status"></div>
                        </div>
                            
                        <div className="username">{props.name}</div>
                    </div>
                    <div className="messagePreview"><p>{props.name+ " : " + props.text}</p></div>

                </div>
            </div>            
            </>
        )
    }     

    return(
        <>
        <div className="ChatContainerSidebar">
        <div className="ChatContainer">
            {messageArray.map((message, i) =>{

                return <Message name={message.name} pfp={message.pfp} text={message.text}/>



            })}
           
        </div>
        </div> 
    </>

   
    )
}

export default ChatList;