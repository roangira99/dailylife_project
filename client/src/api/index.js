import axios from 'axios'; // used to make API calls

const API = axios.create({ baseURL: 'http://localhost:5000' }); // returns all post that we currently have in the database

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost); // implementing the API call for the updatePost route
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`$/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);