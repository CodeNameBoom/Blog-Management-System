import {  TextField, List, ListItem, ListItemText, Typography, Box } from '@mui/material';  
import React, { useEffect,useState } from 'react';
import { useData } from '../../context/DataProvider';
import { Link } from 'react-router-dom';


import './Categories.css';

const Categories=  () =>{

    const [searchTerm, setSearchTerm] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const { categories} = useData();

    //filter and sort categories

    useEffect(() => {
        // Trigger the slide-in animation after a slight delay or when the component is mounted
        setIsVisible(true);
      }, []);

    const filteredCategories = categories
        .filter(category => category.type.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.type.localeCompare(b.type));

        const categoriesToDisplay = searchTerm ? filteredCategories : filteredCategories.slice(0, 5);

    return(
        <>

        <Box sx={{ p : 2 }} className={`categories-container ${isVisible ? 'slide-in' : ''}`} >
            <Typography variant="h6" className="categories-title">Topics & Genre</Typography>
       

        <TextField

            label="Search Your Intrest "
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='search-input'
            sx={{ mb: 1 }}
        />

        <List>
            {categoriesToDisplay.map((category) =>(

                <ListItem button key = {category.id} className="category-item" >
                    <Link to={`/?category=${(category.type)}` }
                     style={{
                        textDecoration: 'none', // Remove default underline
                        color: 'inherit'}}>
                    <ListItemText primary={category.type} />
                    </Link>
                </ListItem>
            ))}
        </List>


          
        </Box>
        </>

    );

}

export default Categories;