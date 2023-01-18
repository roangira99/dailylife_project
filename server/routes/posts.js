import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../contollers/posts.js'

import auth from '../middleware/auth.js';

const router = express.Router();

// Adding routes
router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost) // for updating existing documents
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

// export the whole router
export default router;