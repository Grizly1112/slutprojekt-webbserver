import React, { memo, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { FaHashtag, FaImage, FaTrash } from 'react-icons/fa';
import { GetGlobalChatMessages, SendGlobalChatMessage } from '../../api/messages';
import { userContext } from '../../context/UserContext';
import Utils from '../../assets/functiions/Utils';
import DefaultPFp from '../../assets/avatarDefault.png'
import { Link } from 'react-router-dom';
import { Loader } from '../../components/assets/Loader';

export default function GlobalChat(props) {
  const [messagetext, setMessageText] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [messageArray, setMessageArray] = useState([]);
  const [userHasLoadedIn, setUserHasLoadedIn] = useState(false);
  const [messageImgUpload, setMessageImgUpload] = useState("");
  const contextValue = useContext(userContext);
  const container = useRef(null)
  const loadingMsgRef = useRef(true);

  useEffect(() => {
    if (contextValue.user && !userHasLoadedIn) {
      setUserHasLoadedIn(true);
    }
  }, [contextValue]);

  useEffect(() => {
      GetGlobalChatMessages().then((res) => {
        setMessageArray(res.data.messageArray);
        setLoading(false);
        loadingMsgRef.current = false;
      });
  }, []);


  const Scroll = () => {
    
    // Ta bort när messages finns
    const { offsetHeight, scrollHeight, scrollTop } = container.current
    container.current.scrollTo(0, scrollHeight)
    
    if (scrollHeight <= scrollTop + offsetHeight + 100) {
          container.current.scrollTo(0, scrollHeight)
      }
    }
    
    
    const handleChange = useCallback((event) => {
      setMessageText(event.target.value);
    }, []);
  
    const hanldeFileUpload = useCallback(async (e) => {
      const base64 = await Utils.ConvertToBase64(e.target.files[0]);
      setMessageImgUpload(base64);
    }, []);
  
    const onFormSubmit = useCallback(
      (e) => {
        e.preventDefault();
        SendGlobalChatMessage({
          userId: contextValue.user._id,
          messageText: messagetext,
          img: messageImgUpload,
        });
      },
      [contextValue, messagetext, messageImgUpload]
    );
  
    const handleKeyPress = useCallback((e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendButtonRef.current.click();
      }
    }, []);
  

    const Message = memo((props) => {
    
      return (
        <div className={`Message ${props.same ? "" : "SameUserMessage"}`}
          onMouseEnter={props.same ? null : () => {
            let thisEl = document.getElementById(`${props.id}`)
            thisEl.style="visibility: visible"
          }}
          onMouseLeave={props.same ? null : () => {
            let thisEl = document.getElementById(`${props.id}`)
            thisEl.style="visibility: hidden"
          }}
        >
        
        {!props.same ? 
            <div className='ChatPfp' id={props.id}>
                {Utils.FomratMessageTimeDate(props.timestamp, true)}
            </div>
          : 
          <Link className='ChatPfp' to={`/members/user/${props.name}`}>
            <img src={props.pfp} alt='' />
        </Link> 
        }

        <div className='ChatContent'>
              {props.same && 
                <div className='ChatHeader'>
                  <Link className='HeaderUsername' to={`/members/user/${props.name}`}>
                      {props.name}
                  </Link>
                  <div className='HeaderDate'>{Utils.FomratMessageTimeDate(props.timestamp, false)}</div>
                </div>
              }
            <div className='MessageText'>
                <p>{props.text}</p>
                {props.img && <img className='textImg' src={props.img} />}
            </div>
        </div>
    </div>
        );
    });

    useEffect(() => {
      Scroll()
    },[])

    return (
      <div className='globalChat'>
        <div className="header">
          <FaHashtag />
          <h4>Global Chatt</h4>
          <h6>En global chatt för alla</h6>
        </div>
        <hr/>
    
        <div className="content" ref={container}> 
          {isLoading ? <Loader /> :
            messageArray.map((message, i) => {
              let sameUser = false;
              const thisDate = new Date(message.timestamp);
              if(i > 0) {

                const previousMsgDate = new Date(messageArray[i - 1].timestamp);
                const diff = thisDate.getTime() - previousMsgDate.getTime();
                // Convert the difference to days
                const diffInDays = diff / (1000 * 60 * 60 * 1);
                if (diffInDays > 1) {
                  sameUser = true;
                  //  ev lägga till hr med datum i mitten
                }
              } 
              else {
                sameUser = true;
              }

              return (
                <Message
                  key={message._id}
                  name={message.creator.username}
                  same={sameUser}
                  pfp={message.creator.pfp ? ('data:image/png;base64,' +message.creator.pfp.data) : <DefaultPFp />}
                  text={message.text}
                  timestamp={message.timestamp}
                  id={message._id}
                  img={message.img ? ('data:image/png;base64,' +message.img.data): null}
                />
              );
            })
          }
        </div>
    
        <hr />
    
        <form className='formInput' encType='multipart/form-data' onSubmit={onFormSubmit}>
          {messageImgUpload.length > 0 && 
            <div className="imagePreview">
              <div className='imagePreviewContainer'>
                <FaTrash onClick={() => setMessageImgUpload("")}/>
                <img src={messageImgUpload} alt="" />
              </div>
            </div>
          }
    
          <div className="input">
            <textarea
              disabled={Object.keys(contextValue.user).length === 0}
              onChange={handleChange}
              rows={1}
              placeholder={Object.keys(contextValue.user).length > 0 ? "Skriv i Global Chatt": "Du måste logga in för att skriva"}
              onKeyPress={handleKeyPress}
            />
    
            <button onClick={() => upFile.click()}>
              <input type="file" name="" id="upFile" accept='.jpeg, .png, .jpg' onChange={async(e) => { await hanldeFileUpload(e); }} />
              <FaImage />           
            </button>
    
            <button type='submit' id='sendButton' disabled={Object.keys(contextValue.user).length === 0}>
              <h4>Skicka</h4>
            </button>
          </div>
        </form>
      </div>
  )
}