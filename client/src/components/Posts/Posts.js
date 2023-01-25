import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux'; // enables access to global redux store

import Post from './Post/Post'; // Enables us to create post components
import useStyles from './styles'

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts); // example of a hook
    const classes = useStyles(); // example of a hook
    
    console.log(posts);

    return (
        !posts.length ? <CircularProgress /> : ( // alternative way to write an if-else statement
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xa={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;