// File for creating all handlers for our routes (executin the functions in routes/posts.js)
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'; //gives access to model

// Asynchronous functions are used to find something inside of a model
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    // creating a new post
    const newPost = new PostMessage(post);

    try { 
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// Function for updating a post
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, { new: true }); // accessing the updted post

    res.json(updatePost);

}