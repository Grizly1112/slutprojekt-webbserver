import axiosInstance from './axiosInstance';


export const CreateForumPost = async (postData) => await axiosInstance.post('/forum/newpost', {postData: postData})

export const GetForumPosts = async () => await axiosInstance.get('/forum/getposts');

// export const LikePost = async (postId, userId) => await axiosInstance.post(`post/like/${postId}`, {user: userId});
export const LikePost = async (postId, userId) => await axiosInstance.post(`/post/like/${postId}`, {user: userId});

export const GetSinglePost = async (postId) => await axiosInstance.get(`/forum/singlepost/${postId}`)

let isRequestPending = false;

export const IncrementPostVisitingCount = async (postId) => {
  try {
    const response = await axiosInstance.post(`/post/incrementpostcount/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Initialize a timer variable
let debounceTimer = null;

export const DebouncedIncrementPostVisitingCount = async (postId) => {
    console.log(isRequestPending)
  // Clear the existing debounce timer if it exists
  clearTimeout(debounceTimer);

  // Check if the increment function needs to be called
  if (!isRequestPending) {
    isRequestPending = true; // Set the request status to pending
    IncrementPostVisitingCount(postId); // Call the increment function
  }

  // Create a new debounce timer
  debounceTimer = setTimeout(() => {
    isRequestPending = false; // Reset the request status
  }, 3000);
};