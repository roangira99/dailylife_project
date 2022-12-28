import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../contollers/posts.js'

const router = express.Router();

// Adding routes
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost) // for updating existing documents
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

// export the whole router
export default router;