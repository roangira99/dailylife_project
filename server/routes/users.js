import express from 'express';

import { signin, signup } from '../contollers/user.js'

const router = express.Router();

router.post('/signin', signin); // this is a post route because all form details to the backend
router.post('/signup', signup);

export default router;