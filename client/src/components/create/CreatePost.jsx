

import React, {useState, useEffect, useContext} from 'react';
// import axios from 'axios';
import{AppBar, Tabs, Tab, Typography, Box, FormControl, styled, Button, InputBase,Card, CardMedia, CardContent } from '@mui/material';
import { useData } from '../../context/DataProvider';
import { Link } from 'react-router-dom';
import {API, API_URL} from '../../service/api';

import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';



//styling started
const StyledAppBar = styled(AppBar)`
    margin-bottom: 20px;
    background-color: transparent; 
    box-shadow: none; 
`;

const StyledTabsContainer = styled(Box)`
    padding:20px;
    display: flex;
    justify-content: center;
`;

const StyledTabs = styled(Tabs)`
    background-color: #ffccab; 
`;

const StyledTab = styled(Tab)`
     color: #000;
`;

const StyledFormControl = styled(FormControl)`
    margin-top: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    width: 75%;
`;
const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px 10px 0;
    font-size: 35px;
    border: none;
    &:focus-visible{
        outline: none;
    }
`;

const Textarea = styled('textarea')`
    width: 90%;
    padding: 15px;
    margin-top: 25px;
    font-size: 18px;
    border: 0.1px solid #1111;
    max-height: 600px; 
    overflow-y: auto; 
    resize: none;
    flex-grow: 1;
    &:focus-visible{
        outline: none;
        
    }     
`;
const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height:90vh;
`;
const PostButton = styled(Button)`
    padding: 8px 8px;
    font-size: 12px; 
    background-color: #3f51b5;
    color: white; 
    border-radius: 4px; 
    transition: background-color 0.3s;
    margin-left: 100%;
  
    &:hover {
    background-color: #303f9f; /* Darker shade on hover */
    }
`;
//styling ended

const initialPost = {
        title: '',
        content:'',
        image: '',
        category:'',
        username: '',
        createdDate: new Date()
    }

const CreatePost= () => {
    const [value, setValue] = useState(0);

    const [imagePreview, setImagePreview] = useState( null);
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectCategory, setSelectCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const { categories, addCategory } = useData(); 
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const { account } =useContext(DataContext);

    
    
useEffect(()=>{
    
}, [])


    const handleInitialPost = (e) =>{
        setPost({
            ...post,
            [e.target.name]: e.target.value,
            category: location.search?.split("=")[1] || '', 
            username: account?.username || '',  
        });

    }
    const handleChange = (e, newValue) =>{
        setValue(newValue);
    };

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append("name", file.name);
        formData.append("file", file);
    
        try {
            const response = await fetch(`${API_URL}/file`, {
                method: 'POST',
                body: formData,
                

            });
    
            const data = await response.json();  // Make sure to parse JSON response
            console.log("File upload response:", data);  // Log the response to inspect
    
            if (data?.imageUrl) {
                return data.imageUrl;  // Return the uploaded file's URL
            } else {
                throw new Error("File upload failed, imageUrl not found in response");
            }
        } catch (error) {
            console.error("File upload error:", error);
            throw error;  // Re-throw error to be handled in the calling function
        }
    };
    
    
    const handleCreatePost = async (postData) => {
        setSuccessMessage('');
        setMessage('');

        try {
          // Send post data to API
          const response = await API.createPost(postData);
          console.log("Full Response Data:", response);
          
          // Check for success response
          if (response?.data?.success) {
            console.log("Post creation success:", response.data);
            setSuccessMessage("Post created successfully!");
            navigate('/');  // Redirect to home page
            return response.data;  
          } else {
           throw new Error(response?.data?.message || "Post creation failed");
          }
        } catch (error) {
          console.error("Post creation error:", error);
          setMessage("An error occurred while creating the post: " + error.message); 
        }
      };
      
      const handlePostButton = async () => {
        if (!post.title.trim() || !post.content.trim()) {
            setMessage("Title and Content cannot be empty!");
            return;
        }

        if (!file) {
            setMessage('"Upload Image" section cannot be empty');
            return;
        }

        try {
            const imageUrl = await handleFileUpload(file);  
            console.log("Image URL after upload:", imageUrl);
            if (!imageUrl) {
                setMessage("Image upload failed. Please try again.");
                return;
            }

            const postData = {
                ...post,
                title: post.title.trim(),
                content: post.content.trim(),
                image: imageUrl,  // Set image URL in postData
                category: selectCategory,
                createdDate: new Date(),
            };

            await handleCreatePost(postData);

            // Reset states after posting
            setPost(initialPost);
            setImagePreview(null);
            setFile(null);
        } catch (error) {
            setMessage(error.message || "An error occurred");
        }
    };

    const handleImageUpload = async (e) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Preview the image
            };
            reader.readAsDataURL(selectedFile);  // Create preview
        }
    };

    

    const handleAddCategory = () => {
        console.log("Type of newCategory:", typeof newCategory);
        console.log("Value of newCategory:", newCategory);
      
        if (typeof newCategory === 'string' && newCategory.trim()) {
          
          addCategory(newCategory);
          setSelectCategory(newCategory);
          setNewCategory(''); // Reset input field
        } else {
          console.error("Invalid input: newCategory is not a string.");
        }
    }
      

    return(
        <StyledBox>
            <StyledAppBar position="static">
                <StyledTabsContainer>
                <StyledTabs value={value} onChange={handleChange}>

                    <StyledTab label="Write Blog" />
                    <StyledTab label="Upload Image"/>

                </StyledTabs>
                </StyledTabsContainer>
            </StyledAppBar>

            {successMessage && (
            <Typography
                    variant='body1'
                    color='success'
                    sx= {{ marginBottom: '5px'}}>
                
                {successMessage}
                
            </Typography>
            )}

            {message && (
                <Typography
                    variant='body1'
                    color='error'
                    sx= {{ marginBottom: '5px'}}
                >
                    {message}

                </Typography>
            )}

            {value === 0 && (
            <StyledFormControl>

            <InputTextField  
                    placeholder='Title' 
                    value={post.title} 
                    // onChange={(e) => setTitle(e.target.value)}
                    onChange={ handleInitialPost}
                    name="title"
                />

                <PostButton variant="contained" onClick={handlePostButton}>
                    Post
                </PostButton>

            </StyledFormControl>
            )}

            {value === 0 && (
                <Textarea 
                    minRows={5}
                    placeholder="Whats in your mind..."
                    value={post.content}
                    // onChange={(e) => setContent(e.target.value)}
                    onChange={ handleInitialPost}
                    name="content"
                /> 
        
            )}
        
            {value === 1 && (
            <Box sx={{ width: '75%', marginTop: 20 }}>
                <p style={{ fontSize: '16px', color: '#3f51b5', fontWeight: 'bold', marginBottom:'10px'}}>
                    Notice :- This Image will use to showcase your post at home page! 
            </p>
                <Typography variant="h6">Upload an Image</Typography>
                <input 
                    type="file" 
                    name='file' 
                    accept="image/*" 
                    onChange={handleImageUpload}
                />

                <hr />
                <br />

                { imagePreview && (
                    <Card sx={{ 
                        width: 250, // Fixed width
                        height: 250, // Fixed height to make it square
                        mt: 2, 
                        boxShadow: 3, 
                        borderRadius: '10px', 
                        overflow: 'hidden', 
                        transition: 'transform 0.3s ease', 
                        '&:hover': { 
                            transform: 'scale(1.05)', 
                        },
                        backgroundColor: '#fafafa',
                        display: 'flex',
                        flexDirection: 'column',
                        }}
                    > 
                        <CardMedia 

                            component="img"
                            height="250"
                            image={imagePreview} 
                            alt="Preview"
                            sx={{ borderRadius: '4px' }}
                        
                        />
                        <CardContent sx={{
                         padding: '16px',
                         backgroundColor: '#f5f5f5',
                        }}
                        >
                            <Typography 

                              variant="h5" 
                              color="primary"
                              fontSize='1.2rem' 
                              gutterBottom 
                              sx={{ 
                                  fontWeight: 'bold',
                                  color: '#000',
                              }}
                            >
                                Sample Title
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="textSecondary" 
                              sx={{ 
                                  fontSize: '16px', 
                                  color: '#757575',
                                  lineHeight: 1.6,
                              }}
                            >
                                This is how your post will appear on homepage

                            </Typography>
                        </CardContent>
                    </Card>
                )}

            </Box>
            )}

            {value === 0 && (
             <>
            

                {/*Dropdown for existing categories*/}

                <select
                    value={selectCategory}
                    onChange={(e) => setSelectCategory(e.target.value)}
                >
                    <option value=''>Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.type}>
                            {category.type}
                        </option>
                    ))}
                </select>

                {/*For Adding New Category*/}
                <input 
                    type='text'
                    placeholder='Add new category'
                    value={newCategory || ''}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button onClick={handleAddCategory}>Add Category</button>

                {selectCategory ? (
                    <Link to={`/create?category=${selectCategory}`}>
                        <button>Apply</button>

                    </Link>
                )  :  (
                    <button disabled>Apply</button>
                
                )}
                
             </>

            )}
        </StyledBox>
       
        
    
    );

}


export default CreatePost;
