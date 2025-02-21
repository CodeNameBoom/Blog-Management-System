import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Tabs, Tab, Typography, Box, FormControl, styled, Button, InputBase, TextareaAutosize, Card, CardMedia, CardContent } from '@mui/material';
import { API } from '../../service/api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';

const StyledAppBar = styled(AppBar)`
    margin-bottom: 20px;
    background-color: transparent;
    box-shadow: none;
`;

const StyledTabsContainer = styled(Box)`
    padding: 20px;
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
    flex-direction: column;
    align-items: center;
    width: 75%;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px 10px 0;
    font-size: 35px;
    border: none;
    &:focus-visible {
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
    &:focus-visible {
        outline: none;
    }
`;

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90vh;
`;

const PostButton = styled(Button)`
    padding: 8px 8px;
    font-size: 12px;
    background-color: #3f51b5;
    color: white;
    border-radius: 4px;
    transition: background-color 0.3s;
    &:hover {
        background-color: #303f9f;
    }
`;

const initialPost = {
    title: '',
    content: '',
    image: '',
    category: '',
    username: '',
    createdDate: new Date()
};

const Update = () => {
    const [value, setValue] = useState(0);
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    // const [imagePreview, setImagePreview] = useState(null); // for image preview

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { account } = useContext(DataContext);

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
                // setImagePreview(response.data.image); // Set current image as preview
            }
        };
        fetchData();
    }, [id]);

    const handleInitialPost = (e) => {
        setPost((prevPost) => ({
            ...prevPost,
            [e.target.name]: e.target.value,
        }));
    };

    const handlePostButton = async () => {
        setSuccessMessage('');
        setMessage('');

        // Validation checks
        if (!post.title.trim() || !post.content.trim()) {
            setMessage("Title and Content cannot be empty!");
            return;
        }

        try {
            const postData = {
                ...post,
                title: post.title.trim(),
                content: post.content.trim(),
            };

            // If there is an image, include it in the update
            // if (file) {
            //     const imageUrl = await handleFileUpload(file);
            //     if (imageUrl) {
            //         postData.image = imageUrl; // Add the image URL to the post
            //     }
            // }

            // Send post data to API
            const response = await API.updatePost(postData);
            if (response?.data?.msg === 'Post updated successfully') {
                setPost(response.data.post); // Update the local state with the updated post
                setSuccessMessage("Post updated successfully!");
                navigate(`/details/${id}`); // Redirect to details page
            } 
        } catch (error) {
            console.error("Post action error:", error);
            setMessage(error.response?.data?.message || "An error occurred: " + error.message);
        }
    };

    // Image file handler
    // const handleFileUpload = async (file) => {
    //     const formData = new FormData();
    //     formData.append("file", file);

    //     try {
    //         const response = await API.uploadFile(formData);
    //         if (response?.data?.imageUrl) {
    //             return response.data.imageUrl;
    //         } else {
    //             throw new Error("File upload failed");
    //         }
    //     } catch (error) {
    //         console.error("Error uploading image:", error);
    //         return null;
    //     }
    // };

    // const handleImageUpload = (e) => {
    //     const selectedFile = e.target.files?.[0];
    //     if (selectedFile) {
    //         setFile(selectedFile);
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setImagePreview(reader.result); // Update image preview
    //         };
    //         reader.readAsDataURL(selectedFile); // Preview the image
    //     }
    // };

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <StyledBox>
            <StyledAppBar position="static">
                <StyledTabsContainer>
                    <StyledTabs value={value} onChange={handleChange}>
                        <StyledTab label="Update Blog" />
                        {/* <StyledTab label="Upload Image" /> */}
                    </StyledTabs>
                </StyledTabsContainer>
            </StyledAppBar>

            {successMessage && (
                <Typography variant="body1" color="success" sx={{ marginBottom: '5px' }}>
                    {successMessage}
                </Typography>
            )}

            {message && (
                <Typography variant="body1" color="error" sx={{ marginBottom: '5px' }}>
                    {message}
                </Typography>
            )}

            {value === 0 && (
                <StyledFormControl>
                    <InputTextField
                        placeholder="Title"
                        value={post.title}
                        onChange={handleInitialPost}
                        name="title"
                    />
                    <Textarea
                        minRows={5}
                        placeholder="What's in your mind..."
                        value={post.content}
                        onChange={handleInitialPost}
                        name="content"
                    />
                    <PostButton variant="contained" onClick={handlePostButton}>
                        Update
                    </PostButton>
                </StyledFormControl>
            )}
        </StyledBox>
    );
};

export default Update;
