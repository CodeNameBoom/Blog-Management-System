import express from 'express';
import {loginUser, signupUser}  from '../controller/user-controller.js';



const router = express.Router();

router.post('/signup',signupUser); //user-controller
router.post('/login', loginUser); //user-controller


export default router ;


