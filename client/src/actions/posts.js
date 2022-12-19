import * as api from '../api';

// Action creators - These are functions that return actions
// To fetch all posts, some time has to pass. Therefore, we have to use redux thunk to add an asynchronous funtion
export const getPosts = () => async (dispatch) => { 
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: 'FETCH_ALL', payload: data }); // an action is an object that has the type and a payload
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}
