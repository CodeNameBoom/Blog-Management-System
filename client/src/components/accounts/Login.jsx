import { useState } from 'react';
import {Box,TextField,Button,styled} from '@mui/material';

const Component = styled(Box)`
 WIDTH : 400PX;
 margin : auto;
box-shadow : 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Imange = styled('img')({
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
       margin-top : 2px 
       } 
    `;
    const LoginButton = styled(Button)`
        text-transform : none;
    `;
    const SignupButton = styled(Button)`
        text-transform : none;
        color : #2874f0;
        hight:48px:
        border-radius :20px;
        box-shadow : 0px 2px 4px 0px rgb(0 0 0/ 20%);
    `;
    const Text = styled('p')({
        color : '#878787',
        fontSize:  '16px',
        textAlign: 'center'

    });



const Login =() => {
    const [account , toggleAcoount]= useState('login');

    const toggleSignup = () =>
    {
       account === 'signup'? toggleAcoount('login'): toggleAcoount('signup');
    }

    const onInputChange = (e) =>{
        console.log(e.target.name,e.target.value);
    }
    return (
        <Component>
            <Box>
                <Imange src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS62PVN-BibYo0ra1gRjl8OOCDbESMRX5Tmjg&s" alt="Login"/>
                {
                    account === 'login'?

                
                <Wrapper>
                    <TextField  id="standard-basic" label="UserName" variant="standard"/>
                    
                    <TextField  id="standard-basic" label="Password" variant="standard"/>
                    <br></br>
                
                    <LoginButton variant="contained"> Login</LoginButton>
                    <Text style={{textAlign: 'centers'}}>OR</Text>
                    <SignupButton onClick={() => toggleSignup()}> Create Account</SignupButton>
                </Wrapper>
    
            :
                <Wrapper>
                    <TextField  id="standard-basic"onChange={(e) => onInputChange(e)} name='name' label="UserName" variant="standard"/>
                    <TextField  id="standard-basic"onChange={(e) => onInputChange(e)} name='Email Id' label="Email Id" variant="standard"/>
                    <TextField  id="standard-basic"onChange={(e) => onInputChange(e)} name='Password' label="Password" variant="standard"/>
                    <br></br>
                
                    <SignupButton variant="outlined">SignUp</SignupButton>
                    <Text style={{textAlign: 'center'}}>OR</Text>
                    <LoginButton variant="contained"onClick={()=> toggleSignup()}> Already have an account</LoginButton>
                
                </Wrapper>
            }           
            </Box>
        </Component>

    )
}
export default Login; //have to export default 
