
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../model/user.js';
import Token from '../model/token.js';



dotenv.config();

export const signupUser = async (request, response) => {
    try {
        //Salt is use to make password look complex
        // const salt = await bcrypt.genSalt(); old syntax we can directly generate salt in hash..
        const hashedPassword =await bcrypt.hash(request.body.password,10);

        // console.log('Request body:', request.body);
        // Destructure the request body
        const { username, email, password } = request.body;
        
        // Log the received data for debugging
        //console.log('Received data:', { username, email, password });
        
        // Check if all required fields are provided and not empty
        if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
            return response.status(400).json({ msg: 'All fields are required and cannot be empty' });
        }

        // Check if the username or email already exists in the database
        const existingUser = await User.findOne({ 
            $or: [{ username }, { email }] 
        });

        if (existingUser) {
            return response.status(400).json({ msg: 'Username or email already exists' });
        }

        // Create a new user instance and save to the database
        const newUser = new User({ 
             username,
             email, 
             password : hashedPassword });
        // console.log('Saving user:', newUser);
        await newUser.save();

        // Return success response
        return response.status(200).json({ msg: 'Signup successful' });
    } catch (error) {
        // Handle duplicate key error (code 11000) gracefully
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0]; // Get the field causing the error
            return response.status(400).json({ msg: `${field} already exists`, error });
        }
        
        // Log and return other errors
        console.error('Error details:', error);
        return response.status(500).json({ msg: 'Error while signing up the user', error });
    }
};

export const loginUser = async (request, response) => {

        let user = await User.findOne({username: request.body.username});
        if(!user){
            return response.status(400).json({msg: 'Username does not match.'});
        }
        try{
               let match =  await bcrypt.compare(request.body.password, user.password); //matching password with database which is encypt
                if(match){
                    const accessToken = jwt.sign(user.toJSON(), process.env.Access_SECRET_KEY,{ expiresIn: '15m' });
                    const refreshToken =jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
                     
                  const newToken =  new Token({ token: refreshToken })
                  await newToken.save();

                  return response.status(200).json({ accessToken: accessToken,refreshToken, username: user.username, email: user.email })


                }else{
                  return response.status(400).json({msg:'Passoword does not match.'});
                }
        }catch (error) {
                return response.status(500).json({ msg: 'Error while login in user'})
        }
}

