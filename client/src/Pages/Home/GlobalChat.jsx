import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaArrowCircleUp, FaArrowUp, FaCircle, FaHashtag, FaImage, FaPaperPlane, FaPaperclip, FaRegPaperPlane, FaTrash } from 'react-icons/fa';
import { GetGlobalChatMessages, SendGlobalChatMessage } from '../../api/messages';
import { userContext } from '../../context/UserContext';
import Utils from '../../assets/functiions/Utils';

import DefaultPFp from '../../assets/avatarDefault.png'
import { Link } from 'react-router-dom';
import { Loader } from '../../components/assets/Loader';

export default function GlobalChat(props) {
  // https://stackoverflow.com/questions/6014702/how-do-i-detect-shiftenter-and-generate-a-new-line-in-textarea
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [messageArray, setmessageArray] = useState([]);
  const [userHasLoadedIn, setUSerHasLoadidin] = useState(false)

  const [messageImgUpload, setMessageImgUpload] = useState("");

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
      
      GetGlobalChatMessages().then(res => {
            setmessageArray(res.data.messageArray)
            setLoading(false);
            Scroll()
        })

        if(contextValue.user && !userHasLoadedIn) {
          setUser(contextValue.user)
          setUSerHasLoadidin(true)

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
                                {/* {
                                  user.staff? 
                                  <p className='staffBadge'>Moderator</p>
                                  : null
                                } */}
                                <div className='HeaderDate'>{Utils.FomratMessageTimeDate(props.timestamp, false)}</div>{" "}
                            </div>
                            <div className='MessageText'>
                                <p>{props.text}</p>
                            </div>
                                {
                                  props.img ? 
                                  <img src={props.img} />
                                  : null
                                }
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
                                {
                                  props.img ? 
                                  <img src={props.img.img} />
                                  : null
                                }
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
    console.log("MMASLMSLKSADLKSASKLAJD")
    console.log(container.current.scrollHeight)
    
    // Ta bort när messages finns
    const { offsetHeight, scrollHeight, scrollTop } = container.current
    container.current.scrollTo(0, scrollHeight)
    
    if (scrollHeight <= scrollTop + offsetHeight + 100) {
          container.current.scrollTo(0, scrollHeight)
      }
    }
    
    
    const [messagetext, setMessageText] = useState("");
    function handleChange(event) {
      setValue(event.target.value);
        setMessageText(event.target.value);
        console.log(messagetext);
    }

    
    const hanldeFileUpload = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      // setPostImage({...postImage, base64: base64})
      console.log(base64)
      setMessageImgUpload(base64)
      // console.log(postImage)
  }
  
  useEffect(() => {
    Scroll()
  },[])


  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileSize = file.size; // get the file size in bytes
      const maxSize = .1 * 1024 * 1024; // 5MB in bytes
  
      if (fileSize > maxSize) {
        // If file size is greater than 5MB, reject the promise with an error message
        reject(new Error("File is too large"));
        alert("File to Large")
        return;
      }
  
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


    const onFormSubmit = e => {
      e.preventDefault();
      SendGlobalChatMessage({userId: contextValue.user._id, messageText: messagetext, img: messageImgUpload})

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
        isLoading ?
        <Loader />
        :
        <>
        {
        messageArray.map((message, i) => {
            var sameUser = false;
            if (i > 0) {
                message.creator.username === messageArray[i - 1].creator.username
                ? (sameUser = true)
									: (sameUser = false);
               
                  const thisDate = new Date(message.timestamp);
                  const previousMsgDate = new Date(messageArray[i - 1].timestamp);
                  const diff = thisDate.getTime() - previousMsgDate.getTime();
                  // Convert the difference to days
                  const diffInDays = diff / (1000 * 60 * 60 * 1);
                  if (diffInDays > 1) {
                   sameUser = false;
                  //  ev lägga till hr med datum i mitten
                  }
                }

							return sameUser ? (
								<Message
                  name={message.creator.username}
									same={false}
                  pfp={message.creator.pfp ? message.creator.pfp.img : <DefaultPFp />}
									text={message.text}
									timestamp={message.timestamp}
                  id={message._id}
                  img={message.img}
                />
              ) : (
                <Message
                    name={message.creator.username}
                    same={true}
                    pfp={message.creator.pfp ? message.creator.pfp.img : <DefaultPFp />}
                    text={message.text}
                    timestamp={message.timestamp}
                    id={message._id}
                    img={message.img}
                />
                );
              })}
        </>
        } 
      </div>

      <hr />
      <form className='formInput' onSubmit={onFormSubmit}>
        {
          messageImgUpload.length > 0 ? 
          <div className="imagePreview">
          <div className='imagePreviewContainer'>
            <FaTrash onClick={() => setMessageImgUpload("")}/>
            <img src={messageImgUpload} alt="" />
          </div>
        </div>
          : 
          null
        }
         
        <div className="input">
          <textarea value={value} disabled={Object.keys(contextValue.user).length > 0 ? false: true} onChange={handleChange} rows={1} placeholder={Object.keys(contextValue.user).length > 0 ? "Skriv i Global Chatt": "Du måste logga in för att skriva"}/>
          <button onClick={() => upFile.click()}>
            <input type="file" name="" id="upFile" accept='.jpeg, .png, .jpg'  
            onChange={async(e) => { await hanldeFileUpload(e); }}
             />
            <FaImage />           
          </button>
          <button type='submit' disabled={Object.keys(contextValue.user).length > 0 ? false: true}><h4>Skicka</h4></button>
        </div>
      </form>
    </div>
    </>
  )
}
