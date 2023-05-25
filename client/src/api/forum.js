import axiosInstance from './axiosInstance';


export const CreateForumPost = async (postData) => await axiosInstance.post('/forum/newpost', {postData: postData})

export const GetForumPosts = async () => await axiosInstance.get('/forum/getposts')