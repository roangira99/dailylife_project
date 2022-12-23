import express from 'express';

import { getPosts, createPost, updatePost} from '../contollers/posts.js'

const router = express.Router();

// Adding routes
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost) // for updating existing documents

// export the whole router
export default router;