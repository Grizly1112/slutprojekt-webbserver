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

        name: "Isaactope",
        pfp: "https://cdn.discordapp.com/avatars/606546899083984896/4795d348642ac72c7b900c0389ac10e3.webp?size=128",
        text:"MAMAMAMGMAGMGMAMGA",
        time: "22:52" ,

    },
    {

        name: "Emirzade",
        pfp: "https://cdn.discordapp.com/avatars/381513130771087370/4419cc95c25b44938d8b6d4d0a6dbb43.webp?size=128",
        text:"bruh",
        time: "22:48" ,

    },

    {

        name: "Rmop700",
        pfp: "https://cdn.discordapp.com/avatars/152447528007106560/dbe1bbf9164257507e3159e9d20b64d4.webp?size=128",
        text:"öööööhhhhhhhh",
        time: "22:40" ,

    },


];




    const Message = (props) => {


        return(
            <>
          
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
           <hr className='MessageHr'/>
            </>
        )
    }     

    return(
        <>
        <div className="ChatWindowContainer">
            <div className="ChatName"> <FaGlobeAfrica className='GlobeIcon'/> <h2>Global</h2>  </div>
            <div className="ChatWindowMessageContainer">
            {messageArray.map((message, i) =>{

            return <Message name={message.name}  pfp={message.pfp} text={message.text} time={message.time}/>
            })}




            </div>
            <div className="MessageBox">

                
            </div>



        </div>
    </>

   
    )
}

export default ChatWindow;