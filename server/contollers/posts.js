// File for creating all handlers for our routes (executin the functions in routes/posts.js)
import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js'; //gives access to model

const router = express.Router();

// Asynchronous functions are used to find something inside of a model
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    // creating a new post
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()});

    try { 
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// Function for updating a post
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true }); // accessing the updted post

    res.json(updatePost);

}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    
    await PostMessage.findByIdAndRemove(id);
    
    res.json({ message: 'Post deleted successfully.' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId)  {
        return res.json({ message: 'Unauthenticated' });
    }

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    // We first find the post we are looking for
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));// Checking whether the user's ID is already in the likes section or not

    if(index === -1) {
        post.likes.push(req.userId); // push the user's Id to add a like
    } else {
        //removing a like
        post.likes =  post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
    
}

export default router;