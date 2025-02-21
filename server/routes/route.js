import express from 'express';
import {loginUser, signupUser}  from '../controller/user-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';

// import { uploadImage } from '../controller/image-controller.js';

import {upload , uploadImage, getImage, createPost, getAllPosts, getPost, updatePost, deletePost} from '../utils/upload.js'

const router = express.Router();

router.post('/signup',signupUser); //user-controller
router.post('/login', loginUser); //user-controller

router.post('/file', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);

router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

export default router ;


