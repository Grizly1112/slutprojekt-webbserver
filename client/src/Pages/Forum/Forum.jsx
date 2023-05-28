import React, { useContext, useEffect, useRef, useState } from 'react'
import './css/Forum.css'
import '../Home/css/Home.css'
import { userContext } from '../../context/UserContext'
import UserPfpTest from '../../assets/avatarDefault.png'
import { Link, NavLink } from 'react-router-dom'
import Modal from '../../components/assets/Modal'
import ShareModal from '../../components/ShareModal'
import { FaAngleDoubleDown, FaExclamationCircle, FaEye, FaFireAlt, FaImage, FaSearch, FaShareAlt, FaTags, FaThumbsUp, FaTimesCircle, FaTrash } from 'react-icons/fa'
import { MultiSelect } from "react-multi-select-component";
import Utils from '../../assets/functiions/Utils'
import { CreateForumPost, GetForumPosts } from '../../api/forum'
import { Loader } from '../../components/assets/Loader'
export default function Forum() {
    const contextValue = useContext(userContext)
    const [user, setUser] = useState(null);
    const [postloading, setPostLoading] = useState(true)
    const [forumPosts, setForumPosts] = useState();
    useEffect(() => {
        if(contextValue.user) {
            setUser(contextValue.user)
            GetForumPosts().then((res) => {
                setForumPosts(res.data.posts);
                console.log(res.data.posts)
                setPostLoading(false);
            })
            

        }
    }, [contextValue])

    const CreatePost = () => {
        const options = [
          { label: "Album", value: "album" },
          { label: "Låt", value: "song" },
          { label: "Nyhet", value: "nyheter" },
          { label: "Artist", value: "artister" },
        ];
      
        const CreatePostModal = () => {
          const [postImage, setPostImage] = useState([]);
          const [selected, setSelected] = useState([]);
          const [postTitle, setPostTitle] = useState(null);
          const [postText, setPostText] = useState(null);
            
          const submitCreatePost = () => {
            if(!postText || !postTitle) alert("Fyll i formulär!")            
           
            if(postText && postTitle) {
                let postData = {
                    title: postTitle,
                    text: postText,
                    tags: selected,
                    images: postImage,
                    creator: user._id,
                }

                CreateForumPost(postData);
            }
        }
        
          const hanldeFileUpload = async (e) => {
            const file = e.target.files[0];
            const base64 = await Utils.ConvertToBase64(file);
            setPostImage([...postImage, base64]);
          };
      
          const handleDeleteImage = (index) => {
            const updatedImages = postImage.filter((_, i) => i !== index);
            setPostImage(updatedImages);
          };
      
          return (
            <div className="createPostModal">
              <div className="createPostModalTitle">
                <h2>Skapa ett inlägg</h2>
              </div>
              <hr />
              <div className="titlePlusTags">
                <section>
                  <label htmlFor="title">Inlägg rubrik</label>
                  <input type="text" name="title" onInput={(e) => {
                    setPostTitle(e.target.value)
                  }} className="inputPost" placeholder="Rubrik" />
                </section>
                <section>
                  <label htmlFor="title">Inlägg Taggar</label>
                  <MultiSelect options={options} value={selected} onChange={setSelected} labelledBy="Select" />
                </section>
                <section>
                <label htmlFor="title">Inlägg Text</label>
              <textarea type="text"  onInput={(e) => {
                    setPostText(e.target.value)
                  }}className="inputPost" name="title" placeholder="Text" />
                </section>
              </div>
              <div className="titlePlusTags">
                <section>
                  <label className="editProfilePicture">
                    <FaImage /> Lägg till bilder
                    <input
                      type="file"
                      name="base64"
                      id="file-upload"
                      accept=".jpeg, .png, .jpg"
                      onChange={async (e) => {
                        await hanldeFileUpload(e);
                      }}
                    />
                  </label>
                </section>
                <section>
                  <label htmlFor="">Valda bilder</label>
                  <div className="img-selected">
                    {postImage.length > 0 ? (
                      <>
                        {postImage.map((img, index) => (
                          <div key={index} className="specific-img-selected">
                            <FaTrash onClick={() => {
                                console.log("jejej")
                                setTimeout(() => {
                                    handleDeleteImage(index)
                                }, 100)
                            }} />
                            <img className="createPostPreviewImg" src={img} alt="image" />
                          </div>
                        ))}
                      </>
                    ) : (
                      <p><FaImage /> <h4>
                        Inga valda bilder ännu...
                        </h4>
                        </p>
                    )}
                  </div>
                </section>
              </div>
              <hr />
              <div className="createpostFooterbuttonCenter">
                <button className="createOistFooter" onClick={submitCreatePost}>Publicera Inlägg</button>
              </div>
            </div>
          );
        };

        return(
            <>
                {
                user && (
                <div className='create-post-container'>
                    <NavLink to={`/members/user/${user.username}`} >
                        <img  className='imagepfppreviewpost' src={
                            user.pfp && ('data:image/png;base64,' + user.pfp.data) || UserPfpTest
                        } alt="" />
                    </NavLink>
                    <Modal 
                    modalClass="createPostModal"
                    buttonClose={true}
                    openState={false}
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
                    props.creator.pfp ?('data:image/png;base64,' + props.creator.pfp.data) : userDefault} alt="" />
                <h3>{props.creator.username}</h3>
                <Link to={`/forum/${props.id}`} className="text">
                    <h3>{props.title}</h3>
                    <p>{props.text}</p>
                </Link>
                    {
                        props.tags &&
                        <>
                        {
                            <div className="tags">
                                {

                                props.tags.map(tag => {
                                    return(
                                        <div className="tag">{tag}</div>
                                        )
                                    })
                                }
                            </div>
                        }
                        </>
                    }
                <div className="stats">
                  <h5 className='timestamp'>{Utils.FomratMessageTimeDateWithYear(props.timestamp)}</h5>
                  {
                    props.images.length > 0 && 
                    <div className="stats-btn">
                      <FaEye /> {props.visitors}
                    </div>
                  }
                {/* <div className="stats-btn">
                    <FaThumbsUp />   
                    {props.likes.length} 
                </div> */}
                <div className="stats-btn">
                    <Modal
                                modalClass='shareMagForum'
                                activeClass='shareBtnActive'
                                buttonClose={true}
                                btnLabel={
                                    <>
                                        <FaShareAlt className='shareicon'/>
                                    </>
                                }>
                                <ShareModal link={`/forum/${props.id}`} title={"Dela Inlägg"} />
                    </Modal>
                    </div>
                </div>
            </div>
        )
    }

    const ForumPostController = () => {
        const inputRef = useRef(null);
        
        const handleSearchClick = () => {
            inputRef.current.focus();
          };

        return(
            <div className='forumPostController'> 
                 <div className="search">
                    <FaAngleDoubleDown />
                    Senaste inlägg
                </div>
                <div className="search">
                    <FaFireAlt />
                    Populära inlägg
                </div>
               
                <div className="search" onClick={handleSearchClick}>
                    <FaSearch />
                    <input type="text" placeholder='Sök efter inlägg' ref={inputRef} name="search" />
                </div>
               
            </div>
        )
    }

    return (
        <>
        user && 
        
            <div className='forum'>
            <CreatePost />
            <ForumPostController />
            <div className="forumPostPrieviewContainer">
            {/* <PostPreview creator={user}title="Min recension av det nya albumet" text="text baba bab ajksf klasfklsaf klsajfkjlfslkfas lksaijdajklresjknwokdkjsz dnasfkjlsajfeopiwrnj xzjkeasjfsdjfklasf bejks,z.jd nfbjksvdzslj fensndlkfeiossds ferasf asr sfwr fs" /> */}
            
            {postloading ? (
            <Loader />
            ) : (
            <>
                {forumPosts.map((post, i) => (
                <PostPreview
                    key={i}
                    id={post._id}
                    creator={post.creator}
                    title={post.title}
                    tags={post.tags}
                    text={post.text}
                    images={post.img}
                    timestamp={post.timestamp}
                    likes={post.likes}
                    visitors={post.visitors || 0}
                />
                ))}
                {forumPosts.length === 0 && <p>Inga inlägg..</p>}
            </>
            )}
            </div>
    </div>
    </>
  )
}
