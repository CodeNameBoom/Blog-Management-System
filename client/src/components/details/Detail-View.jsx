


import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API  } from '../../service/api'; // Assuming you have an API method to fetch posts by ID
import { Box, styled, Typography } from '@mui/material';
import {Edit , Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)`
  margin: 50px auto;
  padding: 20px; /* Add padding */
  max-width: 800px; /* Limit the width for better readability */
  background: #f9f9f9; /* Light background for contrast */
  border-radius: 8px; /* Smooth rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);

   @media (max-width: 768px) {
    margin: 10px;
    padding: 15px;
  }
`
const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'cover',
  borderRadius: '8px 8px 0 0',
});

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  margin: 50px 0 10px 0;
  word-break: break-word;
  color: #333; 
`;

const EditIcon = styled(Edit)`
  margin : 5px;
  padding: 8px;
  border: 1px solid #007BFF;
   border-radius: 50%;
   cursor: pointer;
  background: #e6f7ff; /* Subtle blue background */
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1); /* Slight zoom on hover */
    background: #b3e5fc;
  }

`;
const DeleteIcon = styled(Delete)`
  margin : 5px;
  padding: 8px;
   border: 1px solid #dc3545;
  border-radius: 50%;
  cursor: pointer;
  background: #ffe6e6; /* Subtle red background */
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1); /* Slight zoom on hover */
    background: #ffcccc;
  }

`;

const Author = styled(Box)`

  color: #878787;
  margin: 20px 0;
  display : flex;
  justify-content: space-between; /* Align items to ends */
  align-items: center;
  font-size: 14px;

`;

const Content = styled(Typography)`
  word-break = break-word;
  font-size: 16px;
  line-height: 1.6;
  color: #444;
  margin-top: 20px;


`


const DetailView = () => {

  const { id } = useParams();
  const { account } = useContext(DataContext);

  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const url = post.image ? post.image :'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'

  useEffect(() => {
    const fetchPost = async () => {
        let response = await API.getPostById(id);  // Call your API method to get the post by ID
      
        if (response.isSuccess) {
        setPost(response.data);  // Store the fetched post in state
      } else {
        // Handle error if the post is not found or there is any issue
        console.error("Error fetching post:", response.msg);
      }
    };
    fetchPost();
  }, [id]); 


  const deleteBlogPost = async()=>{
    let response = await API.deletePost(post._id);
    if(response.isSuccess){
      navigate('/')
    }
  }

  return (
    <Container>
      <Image src = {url} alt='blog' />

      <Box style={{float: 'right'}}>
        {
          account.username === post.username &&
          <>
            <Link to={`/update/${post._id}`}>
            <EditIcon color='primary'/>
            </Link>
            <DeleteIcon onClick={() => deleteBlogPost()} color='error' />
          </>
        }
        
      </Box>

      <Heading>{post.title}</Heading>
   
    <Author>
      <Typography>Author: <Box component="span" style={{ fontWeight: 600}}>{post.username}</Box></Typography>
      <Typography style={{marginLeft:'auto'}}>{new Date (post.createdDate).toDateString()}</Typography>
    </Author>
    <Content>{post.content}</Content>
    </Container>
  );

};

export default DetailView;
