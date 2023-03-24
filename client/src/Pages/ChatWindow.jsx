import { useState } from 'react';
import { FaGlobeAfrica } from 'react-icons/fa';
import './css/ChatWindow.css';



function ChatWindow() {

    const messageArray = [{

        name: "Grizly",
        pfp: "https://cdn.discordapp.com/avatars/431824979554992132/3a3e21c61bed5e4cf147e7b64d79d441.webp?size=128",
        text:"Ut med muslimianerna",
        time: "23:59" ,
    },
 
    
    {

        name: "Emirzade",
        pfp: "https://cdn.discordapp.com/avatars/381513130771087370/4419cc95c25b44938d8b6d4d0a6dbb43.webp?size=128",
        text:"bruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruh",
        time: "22:48" ,

    },
    {

        name: "Emirzade",
        pfp: "https://cdn.discordapp.com/avatars/381513130771087370/4419cc95c25b44938d8b6d4d0a6dbb43.webp?size=128",
        text:"brubruhbruhbruhbruhbrubruhbruhbruhbruhbruhbruhbruhbruhhbrubruhbruhbruhbruhbruhbruhbruhbruhhbrubruhbruhbruhbruhbruhbruhbruhbruhhbrubruhbruhbruhbruhbruhbruhbruhbruhhbrubruhbruhbruhbruhbruhbruhbruhbruhhbruhbruhbruhbruhh",
        time: "22:48" ,

    },

    {

        name: "Rmop700",
        pfp: "https://cdn.discordapp.com/avatars/152447528007106560/dbe1bbf9164257507e3159e9d20b64d4.webp?size=128",
        text:"öööööhhhhhhhh",
        time: "22:40" ,

    },

    {

        name: "Isaactope",
        pfp: "https://cdn.discordapp.com/avatars/606546899083984896/4795d348642ac72c7b900c0389ac10e3.webp?size=128",
        text:"MAMAMAMGMeAGMGMAMGAMAMAMAMGMeAGMGMAMGAMAMAMAMGMeAGMGMAMGA",
        time: "22:54" ,

    },
    {

        name: "Isaactope",
        pfp: "https://cdn.discordapp.com/avatars/606546899083984896/4795d348642ac72c7b900c0389ac10e3.webp?size=128",
        text:"MAMAMAMGMeAGMGAMAMAMAGGMAMGA",
        time: "22:54" ,

    },
    {

        name: "Grizly",
        pfp: "https://cdn.discordapp.com/avatars/431824979554992132/3a3e21c61bed5e4cf147e7b64d79d441.webp?size=128",
        text:"Ut med muslimianerna",
        time: "23:59" ,
    },
    {

        name: "Emirzade",
        pfp: "https://cdn.discordapp.com/avatars/381513130771087370/4419cc95c25b44938d8b6d4d0a6dbb43.webp?size=128",
        text:"bruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruh",
        time: "22:48" ,

    },
    {

        name: "Grizly",
        pfp: "https://cdn.discordapp.com/avatars/431824979554992132/3a3e21c61bed5e4cf147e7b64d79d441.webp?size=128",
        text:"Ut med muslimianerna",
        time: "23:59" ,
    },
    {

        name: "Grizly",
        pfp: "https://cdn.discordapp.com/avatars/431824979554992132/3a3e21c61bed5e4cf147e7b64d79d441.webp?size=128",
        text:"Ut med muslimianerna",
        time: "23:59" ,
    },
    {

        name: "Grizly",
        pfp: "https://cdn.discordapp.com/avatars/431824979554992132/3a3e21c61bed5e4cf147e7b64d79d441.webp?size=128",
        text:"Ut med muslimianerna",
        time: "23:59" ,
    },
    {

        name: "Grizly",
        pfp: "https://cdn.discordapp.com/avatars/431824979554992132/3a3e21c61bed5e4cf147e7b64d79d441.webp?size=128",
        text:"Ut med muslimianerna",
        time: "23:59" ,
    },
    {

        name: "Emirzade",
        pfp: "https://cdn.discordapp.com/avatars/381513130771087370/4419cc95c25b44938d8b6d4d0a6dbb43.webp?size=128",
        text:"bruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruh",
        time: "22:48" ,

    },
    {

        name: "Grizly",
        pfp: "https://cdn.discordapp.com/avatars/431824979554992132/3a3e21c61bed5e4cf147e7b64d79d441.webp?size=128",
        text:"Ut med muslimianerna",
        time: "23:59" ,
    },  {

        name: "Emirzade",
        pfp: "https://cdn.discordapp.com/avatars/381513130771087370/4419cc95c25b44938d8b6d4d0a6dbb43.webp?size=128",
        text:"bruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruhbruh",
        time: "22:48" ,

    },
    {

        name: "Grizly",
        pfp: "https://cdn.discordapp.com/avatars/431824979554992132/3a3e21c61bed5e4cf147e7b64d79d441.webp?size=128",
        text:"Ut med muslimianerna",
        time: "23:59" ,
    },
    
 

];
var sameUser;



    const Message = (props) => {

        return(
            <>
            {props.same ? <hr className='MessageHr'></hr>  : console.log("MAAAAAAAAAAAAAAAAAAAAAAAAAG") }

            {props.same ? <>
                <div className="Message">
                    <div className="ChatPfp">
                    <img src={props.pfp} alt="" />

                    </div>
                    <div className="ChatContent">
                    <div className="ChatHeader">
                        <div className="HeaderUsername">{props.name}</div>
                         <div className="HeaderDate">{props.time}</div>   </div>
                <div className="MessageText"><p>{props.text}</p></div>
                </div>
            </div>
            </>
            
            
            
            
            
            
            : <>
            <div className="SameUserMessage">
        
                <div className="ChatContent">
             
            <div className="MessageText"><p>{props.text}</p></div>
            </div>
        </div>
        </> }

            
       
            </>
            
        )
    }     

    return(
        <>
        <div className="ChatWindowContainer">
            <div className="ChatName"> <FaGlobeAfrica className='GlobeIcon'/> <h2>Global</h2>  </div>
            <div className="ChatWindowMessageContainer" id='BottomScroll'>
            {messageArray.map((message, i) =>{
      
            if(i>0){
                (message.name === messageArray[i-1].name) ? sameUser = true: sameUser = false  
            } 

            return  sameUser ? <Message name={message.name} same={false} pfp={message.pfp} text={message.text} time={message.time}/>: <Message name={message.name} same={true} pfp={message.pfp} text={message.text} time={message.time}/>
            })}

            </div>
            <div className="MessageBox">

                
            </div>



        </div>
    </>

   
    )

    
}


export default ChatWindow;