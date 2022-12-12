import React from 'react';
import Post from './Post/Post'; // Enables us to create post components

const Posts = () => {
    return (
        <>
            <h1>POSTS</h1>
            <Post />
            <Post />
        </>
    );
}

export default Posts;