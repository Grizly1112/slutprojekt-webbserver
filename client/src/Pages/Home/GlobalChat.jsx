import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaArrowCircleUp, FaArrowUp, FaCircle, FaHashtag, FaPaperPlane, FaPaperclip, FaRegPaperPlane } from 'react-icons/fa';
import { GetGlobalChatMessages, SendGlobalChatMessage } from '../../api/messages';
import { userContext } from '../../context/UserContext';
import Utils from '../../assets/functiions/Utils';

import DefaultPFp from '../../assets/avatarDefault.png'
import { Link } from 'react-router-dom';

export default function GlobalChat(props) {
  // https://stackoverflow.com/questions/6014702/how-do-i-detect-shiftenter-and-generate-a-new-line-in-textarea
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState("");
  const [messageArray, setmessageArray] = useState([]);

  function handleKeyPress(event) {
    if (event.keyCode === 13) {
      const content = event.target.value;
      const caret = event.target.selectionStart;
      if (event.shiftKey) {
        event.preventDefault();
        setValue(
          content.substring(0, caret) + "\n" + content.substring(caret, content.length)
        );
      } else {
        // Submit the form or do any other action here
      }
    }
  }

  const [user, setUser] = useState({});
    const contextValue = useContext(userContext)
    useEffect(() => {
        Scroll()

        GetGlobalChatMessages().then(res => {
            setmessageArray(res.data.messageArray)
            console.log(res.data.messageArray)
            messageArray.map(msg => {
                console.log(msg.creator.username)
            })
            setLoading(false);
        })

        if(contextValue.user) {
          setUser(contextValue.user)
        }
    }, [contextValue])

const Message = (props) => {
    return (
        <>
            {props.same ? (
                <>
                    <div className='Message'>
                        <Link className='ChatPfp' to={`/members/user/${props.name}`}>
                            <img src={props.pfp} alt='' />
                        </Link>
                        <div className='ChatContent'>
                            <div className='ChatHeader'>
                              <Link className='HeaderUsername' to={`/members/user/${props.name}`}>{props.name}</Link>
                                {
                                  user.staff? 
                                  <p className='staffBadge'>Moderator</p>
                                  : null
                                }
                                <div className='HeaderDate'>{Utils.FomratMessageTimeDate(props.timestamp, false)}</div>{" "}
                            </div>
                            <div className='MessageText'>
                                <p>{props.text}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='Message SameUserMessage' 
                    onMouseEnter={() => {
                        let thisEl = document.getElementById(`${props.id}`)
                        thisEl.style="visibility: visible"
                    }}
                    onMouseLeave={() => {
                        let thisEl = document.getElementById(`${props.id}`)
                        thisEl.style="visibility: hidden"
                    }}
                    >
                    <div className='ChatPfp' id={props.id}>
                        {Utils.FomratMessageTimeDate(props.timestamp, true)}
                        </div>
                        <div className='ChatContent'>
                            <div className='MessageText'>
                                <p>{props.text}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
  
  const [messages, setMessages] = useState([])
  const container = useRef(null)
  
  const Scroll = () => {
    console.log(container.current.scrollHeight)
    
    // Ta bort när messages finns
    container.current.scrollTo(0, container.current.scrollHeight)
    
    // const { offsetHeight, scrollHeight, scrollTop } = container.current
    // if (scrollHeight <= scrollTop + offsetHeight + 100) {
        //   container.current.scrollTo(0, scrollHeight)
        // }
    }
    
    
    const [messagetext, setMessageText] = useState("");
    function handleChange(event) {
      setValue(event.target.value);
        setMessageText(event.target.value);
        console.log(messagetext);
    }


  const onFormSubmit = e => {
    e.preventDefault();
    console.log(messagetext)
    SendGlobalChatMessage({userId: user._id, messageText: messagetext})

    console.log(user._id)

    // send state to server with e.g. `window.fetch`
}




  return(
    <>
    <div className='globalChat'>
      <div className="header">
        <FaHashtag />
        <h4>Global Chatt</h4>
        
        <div className="circle"></div>
      </div>
      <hr/>
      <div className="content" ref={container}> 
      {
        isLoading && messageArray.length === 0? 
        <p>laddar</p>
        :
        <>
        {messageArray.map((message, i) => {
            var sameUser = false;
            if (i > 0) {
                message.creator.username === messageArray[i - 1].creator.username
                ? (sameUser = true)
									: (sameUser = false);
							}

							return sameUser ? (
								<Message
                  name={message.creator.username}
									same={false}
                  pfp={message.creator.pfp ? message.creator.pfp.img : <DefaultPFp />}
									text={message.text}
									timestamp={message.timestamp}
                  id={message._id}
                />
              ) : (
                <Message
                    name={message.creator.username}
                    same={true}
                    pfp={message.creator.pfp ? message.creator.pfp.img : <DefaultPFp />}
                    text={message.text}
                    timestamp={message.timestamp}
                    id={message._id}
                />
                );
              })}
        </>
        }
      </div>
      <hr />
      <form className='formInput' onSubmit={onFormSubmit}>
        <div className="input">
          <textarea value={value} disabled={Object.keys(user).length > 0 ? false: true} onChange={handleChange} rows={1} placeholder={Object.keys(user).length > 0 ? "Skriv i Global Chatt": "Du måste logga in för att skriva"}/>
          <button type='submit' disabled={Object.keys(user).length > 0 ? false: true}><h4>Skicka</h4></button>
        </div>
      </form>
    </div>
    </>
  )
}
