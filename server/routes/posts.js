import express from 'express';

import { getPosts } from '../contollers/posts.js'

const router = express.Router();

// Adding routes
router.get('/', getPosts);

// export the whole router
export default router;