import React, { useContext, useEffect, useState } from 'react'
import './css/Forum.css'
import { userContext } from '../../context/UserContext'
import UserPfpTest from '../../assets/avatarDefault.png'
import { NavLink } from 'react-router-dom'
import Modal from '../../components/assets/Modal'

export default function Forum() {
    const contextValue = useContext(userContext)
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        if(contextValue.user) {
            setUser(contextValue.user)
        }
    }, [contextValue])
  
    const CreatePost = () => {
        const CreatePostModal = () => {
            return(
                <div className='createPostModal'>
                    <div className="createPostModalTitle">
                        <h2>Skapa ett inlägg</h2>
                    </div>
                    <hr/>
                    .
                    <label htmlFor="title">Inlägg rubrik</label>
                    <input type="text" name='title' className='inputPost' placeholder='Rubrik'/>
                    <label htmlFor="title">Inlägg rubrik</label>
                    <textarea type="text" className='inputPost' name='title' placeholder='Rubrik'/>
                    <hr/>
                    <button>publicera</button>
                </div>
            )
        }

        return(
            <>
                {
                user && (
                <div className='create-post-container'>
                    <NavLink to={`/members/user/${user.username}`} >
                        <img src={
                            user.pfp && ('data:image/png;base64,' + user.pfp.data) || UserPfpTest
                        } alt="" />
                    </NavLink>
                    <Modal 
                    modalClass="createPostModal"
                    buttonClose={true}
                    openState={true}
                    btnLabel={
                     <span className='fakeInput'>
                        <p> 
                        Dela med dig av dina tankar och ideér!
                        </p>
                    </span>
                    }   
                    btnClass={"input"}
                    >
                        <CreatePostModal />
                    </Modal>
                </div>
                )
                }
            </>
        )
    }

    const PostPreview = (props) => {
        return(
            <div className='postPreview'>
                <img src={
                            user.pfp && ('data:image/png;base64,' + user.pfp.data) || UserPfpTest
                } alt="" />
                <h2>{user.username}</h2>
            </div>
        )
    }


    return (
    <div className='forum'>
        <CreatePost />
        <div className="forumPostPrieviewContainer">
        {
         <PostPreview creator={user}title="Min recension av det nya albumet" text="text baba bab ajksf klasfklsaf klsajfkjlfslkfas lksaijdajklresjknwokdkjsz dnasfkjlsajfeopiwrnj xzjkeasjfsdjfklasf bejks,z.jd nfbjksvdzslj fensndlkfeiossds ferasf asr sfwr fs" />
        } 
        </div>
    </div>
  )
}
