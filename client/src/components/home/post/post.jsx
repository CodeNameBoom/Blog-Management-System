import React, { useState, useEffect } from 'react';
import {Box, Typography, styled} from   '@mui/material';
import image from './imagePrivew.jpg'

import {addElipsis} from '../../../utils/common-utils';



const Container = styled(Box)`
border: 1px solid #e0e0e0; /* Light border for a cleaner look */
  border-radius: 15px;
  margin: 10px;
  height: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(145deg, #ffffff, #f9f9f9); /* Soft background gradient */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(106, 160, 205, 0.2); /* Soft shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  opacity: 0; /* Initially hidden */
  animation: fadeIn 1s forwards; /* Apply fade-in animation */
  animation-delay: 0.5s; /* Delay the animation slightly */

  /* Hover effect */
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), 0 4px 15px rgba(106, 160, 205, 0.3);
  }
`;
const Text = styled(Typography)`
    margin-top: 5px;
    color: #878787;
    font-size: 12px;
   
    
`
const Image = styled('img')({
    width: '100%',
    borderRadius: '10px 10px 0 0',
    objectFit: 'cover',
    height:150
});

const Heading = styled(Typography)`
    margin-top: 15px;
    font-size: 18px;
    font-weight: 600;
    color: #333333; /* Dark color for the title */
    text-align: center;
    padding: 0 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

`;
const Details = styled(Typography)`
    margin-top: 10px;
  font-size: 14px;
  word-break: break-word;
  color: #555555; /* Dark gray for content */
  padding: 0 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Truncate long content */
  -webkit-box-orient: vertical;
  text-align: justify;

`



const Post = ({ post }) => {

    const defaultImage = image;

    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        setIsVisible(true); // Trigger visibility change on component mount
      }, []);
    
    console.log("Post Data:", post);
    console.log("Image URL:", post.image); 
    return(
        <Container className={isVisible ? 'fade-in' : ''} >
             {/* Check if image exists before rendering */}
             
            <Image 
                src={post.image || defaultImage} 
                alt="blog" 
                    
            />
            <Text>{post.category}</Text>
            <Heading>{addElipsis(post.title, 10)}</Heading>
            <Text>{post.username}</Text>
            <Details>{addElipsis(post.content,70)}</Details>
        </Container>
    )
}

export default Post;