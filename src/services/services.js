import axios from 'axios'

// USER LOGIN
export async function loginUser(user_details) {

   const options = {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
      method: 'POST',
      data: user_details,
   }
   const response = await axios.request(options)
   return response

}
// USER SIGNUP
export async function registerUser(user_details) {

      const options = {
         url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/register`,
         method: 'POST',
         data: user_details,
         headers: { "Content-Type": "multipart/form-data" },
      }

      const response = await axios.request(options)
      return response
}
// GET USER FEED
export async function getUserFeed(token) {

   const feedOptions = {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/feed`,
      method: 'GET',
      headers: {
         Authorization: `Bearer ${token}`
      }
   }
   const response = await axios.request(feedOptions)
   return response

}
// GET ALL USERS
export async function getUsers(token) {

   const allUserOptions = {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/all`,
      method: 'GET',
      headers: {
         Authorization: `Bearer ${token}`
      }
   }

      const allUserResponse = await axios.request(allUserOptions)
     return allUserResponse
}
// GET USER DETAILS
export async function getUserInfo(token) {

   const options = {
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
      headers: {
         Authorization: `Bearer ${token}`
      }
   }

   const response = await axios.request(options)
   return response
   

}
// GET USER FOLLOWERS
export async function getUserFollowers(token) {

   const options = {
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/followers`,
      headers: {
         Authorization: `Bearer ${token}`
      }
   }
   
   const response = await axios.request(options)
   return response
}
// GET USER FOLLOWING
export async function getUserFollowing(token) {

   const options = {
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/following`,
      headers: {
         Authorization: `Bearer ${token}`
      }
   }

   const response = await axios.request(options)
   return response
  
}
// GET USER POSTS
export async function getUserPosts(token) {
   
   // console.log(token)
   const options = {
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/post`,
      headers: {
         Authorization: `Bearer ${token}`
      }
   }

   const response = await axios.request(options)
   // console.log(response)
   return response

  
}
// FOLLOW A USER
export async function follow(token,_userId){
   const options = {
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/follow/${_userId}`,
      headers: {
         Authorization: `Bearer ${token}`
      }
   }
   const response = await axios.request(options)
   return response
}
// UNFOLLOW A USER
export async function unfollow(token,_userId){
   const options = {
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/unfollow/${_userId}`,
      headers: {
         Authorization: `Bearer ${token}`
      }
   }
   const response = await axios.request(options)
   return response

}

// CREATE A POST
export async function createPost(token,data){

   const options = {
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/post`,
      data:data,
      headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'multipart/form-data'
      }
   }
    const response = await axios.request(options)
   return response

}

// DELETE A POST
export async function deletePost(token,id){
   const options = {
      method: 'DELETE',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/post/${id}`,
      headers: {
         'Authorization': `Bearer ${token}`,
      }
   }

   const response = await axios.request(options)
   return response

}