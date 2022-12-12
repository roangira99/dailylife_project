import express from 'express';

import { getPosts, createPost } from '../contollers/posts.js'

const router = express.Router();

// Adding routes
router.get('/', getPosts);
router.post('/', createPost);

// export the whole router
export default router;