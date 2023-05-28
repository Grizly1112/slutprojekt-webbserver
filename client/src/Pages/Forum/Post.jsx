import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { userContext } from '../../context/UserContext';
import { DebouncedIncrementPostVisitingCount, GetSinglePost, IncrementPostVisitingCount, LikePost } from '../../api/forum';
import { NavLink, useParams } from 'react-router-dom';
import './css/Post.css'
import UserPfpTest from '../../assets/avatarDefault.png'
import Utils from '../../assets/functiions/Utils';
import { Loader } from '../../components/assets/Loader';
import { FaCommentAlt, FaComments, FaEye, FaLine, FaShare, FaShareAlt, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import Tooltip from '../../components/assets/Tooltip';
import ShareModal from '../../components/ShareModal';
import Modal from '../../components/assets/Modal';

export default function Post() {
  const params = useParams();
  const { user: contextUser } = useContext(userContext);
  const [user, setUser] = useState(null);
  const [postloading, setPostLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [postLikes, setPostLikes] = useState(null);

  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    if (contextUser && !hasIncremented) {
      setUser(contextUser);
      DebouncedIncrementPostVisitingCount(params.id); // Use the debounced function here
      GetSinglePost(params.id)
        .then((res) => {
          setPost(res.data.posts);
          setPostLikes(res.data.posts.likes.length);
         
          setPostLoading(false);
        })
        .catch((error) => {
          // Handle error
        });
      setHasIncremented(true); // Update the hasIncremented state
    }
  }, [contextUser, params.id, hasIncremented]);

  const renderPostImages = () => {
    return post.img.map((image) => (
      <img key={image.id} className="postImage" src={`data:image/png;base64,${image.data}`} alt="" />
    ));
  };

  const renderTags = () => {
    return post.tags.map((tag) => <div key={tag} className="tag">{tag}</div>);
  };

  return (
    <div className="postContainer">
      <div className="post">
        {postloading ? <Loader /> : (
          <>
            <div className="header">
              <div className="creator">
                <img src={post.creator.pfp ? `data:image/png;base64,${post.creator.pfp.data}` : UserPfpTest} alt="" />
                <h2>{post.creator.username}</h2>
                {post.creator.staff && <div className="staffBadge">Moderator</div>}
              </div>
              <h3 className='timestamp'>{Utils.FomratMessageTimeDateWithYear(post.timestamp)}</h3>
            </div>
            <hr />
            <h1>{post.title}</h1>
            <hr className="postheader-hr-last" />
            <div className="postcontent">
              <p>{post.text}</p>
              {post.img && <div className="postImages">{renderPostImages()}</div>}
            </div>
            <div className="postStats">
              <div className="tags">{renderTags()}</div>
              <hr />
              <div className="postStatsContent">
                  <div className={
                    post.likes.indexOf(user._id) === -1 ? "statsBtn likebtn" : "statsBtn likebtn liked"
                  } onClick={() => {
                    const likeButton = document.querySelector('.likebtn');
                    const isLiked = post.likes.includes(user._id);
                  
                    if (isLiked) {
                      likeButton.classList.remove('liked');
                      const updatedArray = post.likes.filter(id => id !== user._id);
                      setPost(prevPost => ({
                        ...prevPost,
                        likes: updatedArray
                      }));
                      setPostLikes(prev => prev - 1);
                    } else {
                      likeButton.classList.add('liked');
                      const updatedArray = [...post.likes, user._id];
                      setPost(prevPost => ({
                        ...prevPost,
                        likes: updatedArray
                      }));
                      setPostLikes(prev => prev + 1);
                    }
                    
                    LikePost(post._id, user._id);
                  }} >
                    <FaThumbsUp />
                    {postLikes}
                  </div>
                <Tooltip label={"Kommentera inlägg"}>
                  <div className="statsBtn">
                    <FaCommentAlt />
                    Kommentera
                  </div>
                </Tooltip>
                <Tooltip label={"Antal visningar"}>
                  <div className="statsBtn">
                    <FaEye />
                    {post.visitors}
                  </div>
                </Tooltip>
                  <div className="statsBtn">
                    <Modal
                      modalClass='shareMagForum'
                      activeClass='shareBtnActive'
                      buttonClose={true}
                      btnClass={"sharepostmodal"}
                      btnLabel={
                        <>
                              <FaShareAlt className='shareicon'/> Dela
                          </>
                      }>
                      <ShareModal title={"Dela Inlägg"} />
                    </Modal>
                  </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="commentInput">
        {
          user && (
            <>
            <img src={user.pfp ? `data:image/png;base64,${user.pfp.data}` : UserPfpTest} alt="" />
            <input type="text" placeholder='Dela dina åsikter' />
            <button className='commentButtonSend'>Kommentera</button>
            </>
          )
        }
      </div>
    </div>
  );
};
