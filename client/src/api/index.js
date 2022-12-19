import axios from 'axios'; // used to make API calls

const url = 'http://localhost:5000/posts'; // returns all post that we currently have in the database

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);