import React, { useState } from 'react';
import {Box,TextField,Button,styled, Typography} from '@mui/material';
import { API } from '../../service/api.js'

import '../../style.css';

const Component = styled(Box)`
 WIDTH : 400PX;
 margin : auto;
box-shadow : 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled('img')({
    width: 200 ,
     margin: 'auto',
     display: 'flex',
     padding: '50px 0 0'
    });

    const Wrapper = styled(Box)`
       padding: 25px 35px ;
       display: flex;
       flex: 1;
       flex-direction: column; 
       & > div , & > button {
       margin-top : 6px 
       } 
    `;
    const LoginButton = styled(Button)`
        text-transform : none;
    `;
    const SignupButton = styled(Button)`
        text-transform : none;
        color : #2874f0;
        height:48px;
        border-radius :20px;
        box-shadow : 0px 2px 4px 0px rgb(0 0 0/ 20%);
    `;
    const Text = styled('p')({
        color : '#878787',
        fontSize:  '16px',
        textAlign: 'center',

    });
    const Error = styled(Typography)`
    font-size: 11px;
    color: #ff6161;
    line-height: 1;
    margin-top: 10px;
    font-weight: 700;
    `
 const loginInitialValues = {
        username: '',
        password:''
    };

const signupInitialValues = {
    username: '',
    email: '',
    password: '',

};


const Login =() => {
    const [account , toggleAccount]= useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const[error, setError] = useState('');

    const toggleSignup = () =>
    {
       account === 'signup' ? toggleAccount('login'): toggleAccount('signup');
       
    };

    const onInputChange = (e) =>{
        setSignup({...signup,[e.target.name]: e.target.value}); //key : value
    };
    
    const signupUser = async () => {
        try {

          let response = await API.userSignup(signup);

          if (response.isSuccess) {
            setError('');  // Clear any previous error
            setSignup(signupInitialValues);  // Reset the form values
            toggleAccount('login');  
          } else{

                setError(response.msg || 'Woops! Somthing went wrong.');
            }
        } catch (error) {
          // Catch any error that occurs during the API call 
          console.error("Error during signup:", error);
          setError( 'Woops! Somthing went wrong.');
        }
      };

      const onValueChange = (e) => {
            setLogin({...login, [e.target.name]: e.target.value })
      }
       
      const loginUser = async(e) => {

        e.preventDefault();
        setError('');
        console.log("Login function called");

        try {
            let response = await API.userLogin(login);
            
            if (response.isSuccess) {
                setError(''); // Clear any previous error
                // Handle successful login (e.g., redirect or update state)
            } else {
                // Set error message based on API response
                setError(response.msg || 'Woops! Something went wrong.');
            }
        } catch (error) {
            console.error("Error during login:", error);
            
            // Log the full error object to see its structure
            const errorMessage = error.response?.data?.message || error.message || 'Woops! Something went wrong.';
            setError(errorMessage);
        }
    };
      

    return (
        <Component>
            <Box>
                <Image src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS62PVN-BibYo0ra1gRjl8OOCDbESMRX5Tmjg&s" alt="Login"/>
                {
                    account === 'login'?

                
                <Wrapper>
                    <TextField 
                        id="login-username" 
                        value={login.username} 
                        onChange={(e) => onValueChange(e)}  
                        name='username' 
                        label='Name' 
                        variant="standard" 
                        autoComplete="username"

                     />

                    <TextField 
                        id="login-password"
                        value={login.password} 
                        onChange={(e) => onValueChange(e)}
                        name='password' 
                        label='Password'
                        variant="standard" 
                        type="password" 
                        autoComplete="current-password"

                         />
                    <br></br>

                    {error &&<Error>{error}</Error>}
                    <br></br>

                    <LoginButton variant="contained" onClick={loginUser }> Login</LoginButton>
                    <Text style={{textAlign: 'centers'}}>OR</Text>
                    <SignupButton onClick={() => toggleSignup()}>Create Account</SignupButton>
                    
                </Wrapper>  
    
            : 
                <Wrapper>
                    <TextField 
                        id="signup-username" 
                        onChange={(e) => onInputChange(e)} 
                        name='username' 
                        label="Username" 
                        variant="outlined" 
                        autoComplete="username" 
                        className="textField"

                        />

                    <TextField 
                        id="signup-email" 
                        onChange={(e) => onInputChange(e)} 
                        name='email' 
                        label="Email" 
                        variant="outlined" 
                        autoComplete="email" 
                        className="textField"

                        />

                    <TextField 
                        id="signup-password" 
                        onChange={(e) => onInputChange(e)} 
                        name='password' 
                        label="Password" 
                        variant="outlined" 
                        type="password" 
                        autoComplete="new-password" 
                        className="textField"

                        />
                   

                    
                    {error &&<Error>{error}</Error>}
                    <br></br>
                    <SignupButton variant="outlined"onClick={() => signupUser()}>SignUp</SignupButton>
                    <Text style={{textAlign: 'center'}}>OR</Text>
                    <LoginButton variant="contained"onClick={()=> toggleSignup()}> Already have an account</LoginButton>
                
                </Wrapper>
            }           
            </Box>
        </Component>

    )
}
export default Login; //have to export default 
