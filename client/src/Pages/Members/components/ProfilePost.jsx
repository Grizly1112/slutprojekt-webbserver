/** @format */

import React, { memo, useContext, useEffect, useRef, useState } from "react";
import "../css/ProfilePost.css";
import FormInput from "../../../components/assets/FormInput";
import { FaRegPaperPlane, FaSeedling, FaTrash } from "react-icons/fa";
import { userContext } from "../../../context/UserContext";
import userDefault from "../../../assets/avatarDefault.png";
import Tooltip from "../../../components/assets/Tooltip";
import { Link, NavLink, useLocation } from "react-router-dom";
import { io } from 'socket.io-client';
import Utils from "../../../assets/functiions/Utils";
import { GetProfilePostMessages, ProfilePostMessageUpload } from "../../../api/user";
import { Loader } from "../../../components/assets/Loader";

export default function ProfilePost(props) {
	const [user, setUser] = useState(null);
  const [postImage, setPostImage] = useState(null);

  const location = useLocation();
  const userPage = location.pathname.split('/').at(-1);
	const [profilePostLoading, setProfilePostLoading] = useState(true)

	const contextValue = useContext(userContext);
    const socket = useRef(null);
	const [profilePostArray, setProfilePosts] = useState()

	useEffect(() => {
		socket.current = io("ws://localhost:3001");
		if (contextValue.user) {
			setUser(contextValue.user)
			
		};
		GetProfilePostMessages(userPage).then((res) => {
			// setProfilePosts(res.data);
			console.log(res.data)
			setProfilePostLoading(false);
			setProfilePosts(res.data.messages)
		})
	}, [contextValue]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if(msgText) {
			// socket.current.emit("send-notification", {
			// 	text: "Nytt profilinlägg",
			// 	// Who will recive the notifcation => EX url:'members/GRIZLY' => Grizly
			// 	to: userPage,
			// 	href: location.pathname,
			// });
			
			
			// To update current state of profilePosts 
			const newMsg = {
				_id: 1,
				creator: {
					username: user.username,
					pfp: user.pfp
				},
				text: msgText,
				timestamp: Date.now()
			}
			
			setProfilePosts(oldArray => [...oldArray, newMsg])
			
			const msgToServer = {
				creator: user._id,
				text: msgText,
			}			
			ProfilePostMessageUpload(msgToServer, userPage)
		}
		
	};


	const [msgText, setMsgText] = useState();

	const Message = memo((props) => {
		return (
		  <div className={`Message ${!props.same ? "" : "SameUserMessage"}`}
			onMouseEnter={!props.same ? null : () => {
			  let thisEl = document.getElementById(`${props.id}`)
			  thisEl.style="visibility: visible"
			}}
			onMouseLeave={!props.same ? null : () => {
			  let thisEl = document.getElementById(`${props.id}`)
			  thisEl.style="visibility: hidden"
			}}
		  >
		  
		  {props.same ? 
			  <div className='ChatPfp' id={props.id}>
				  {Utils.FomratMessageTimeDate(props.timestamp, true)}
			  </div>
			: 
			<Link className='ChatPfp' to={`/members/user/${props.name}`}>
			  <img src={props.pfp} alt='' />
		  </Link> 
		  }
  
		  <div className='ChatContent'>
				  {!props.same && (
					<div className='ChatHeader'>
					  <Link className='HeaderUsername' to={`/members/user/${props.name}`}>
						{props.name}
					  </Link>
					  <div className='HeaderDate'>{Utils.FomratMessageTimeDate(props.timestamp, false)}</div>
					</div>
				  )}
			  <div className='MessageText'>
				<p>{props.text}</p>
				{props.img && <img className='textImg' src={props.img} />}
			  </div>
		  </div>
	  </div>
	  );
	});


	return (
    <div className='ProfilePost'>
    {
      postImage && (
        <>
        <div className="profilePostImagePreviews">
          <div className="image">
            <img src={userDefault} alt="" />
            <FaTrash />
          </div>
        </div>
        </>
      )
    }

	{
	user && (
		<form action='' onSubmit={handleSubmit}>
			<Tooltip label={`${user.username}`}>
				<NavLink to={`/members/user/${user.username}`}>
					<img
			src={user.pfp && ('data:image/png;base64,' + user.pfp.data) || userDefault}
			className='onlineUsers-img'
						alt=''
					/>
				</NavLink>
			</Tooltip>
			<input type='text'  autoCapitalize="none" autoComplete="off" autoCorrect="off"  placeholder={`Skriv något om ${userPage}`} 
			onInput={(e) => {
				setMsgText(e.target.value);
			}}
			/>
			<button type='submit'>Skicka</button>
		</form>
	)
	}
			
			<hr />
	  		<div className="profilePosts">
				{

					profilePostLoading ? <Loader /> :
				<>

				 {
					profilePostArray.map((message, i) => {
					var sameUser = false;
					const thisDate = new Date(message.timestamp);
					if(i > 0) {
						if(message.creator.username === profilePostArray[i -1].creator.username) {
							sameUser = true
							
						const previousMsgDate = new Date(profilePostArray[i - 1].timestamp);
						const diff = thisDate.getTime() - previousMsgDate.getTime();
						// Convert the difference to days
						const diffInHours = diff / (1000 * 60 * 60 * 1);
						console.log(diffInHours)
						
						// bara test men 12 minuter
						if (diffInHours > 0.2)  {
							sameUser = false;
						} 
					}
					sameUser=false
				} 
				
				
				return (
					<Message
					key={message._id}
					name={message.creator.username}
					same={sameUser}
					pfp={message.creator.pfp ? ('data:image/png;base64,' +message.creator.pfp.data) : <userDefault />}
					text={message.text}
					timestamp={message.timestamp}
					id={message._id}
					img={message.img ? ('data:image/png;base64,' +message.img.data): null}
					/>
					)
					
				})}
				</>
			}
			</div>
	  
		</div>
	);
}
