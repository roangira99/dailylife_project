import express from 'express';

import { getPosts, createPost, updatePost, deletePost } from '../contollers/posts.js'

const router = express.Router();

// Adding routes
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost) // for updating existing documents
router.delete('/:id', deletePost);

// export the whole router
export default router;