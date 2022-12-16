import React from 'react';
import { useSelector } from 'react-redux'; // enables access to global redux store

import Post from './Post/Post'; // Enables us to create post components
import useStyles from './styles'

const Posts = () => {
    const posts = useSelector((state) => state.posts); // example of a hook
    const classes = useStyles(); // example of a hook
    
    console.log(posts);

    return (
        <> 
            <h1>POSTS</h1>
            <Post />
            <Post />
        </>
    );
}

export default Posts;