import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';

// Action creators - These are functions that return actions
// To fetch all posts, some time has to pass. Therefore, we have to use redux thunk to add an asynchronous funtion
export const getPosts = () => async (dispatch) => { 
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: FETCH_ALL, payload: data }); // an action is an object that has the type and a payload
    } catch (error) {
        console.log(error.message);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likePost(id, user?.token);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};