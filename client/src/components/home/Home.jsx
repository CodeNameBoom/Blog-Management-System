
import {useState} from 'react';
import { Grid } from "@mui/material";
import Banner from "../banner/Banner";
import Categories from "./Categories";
import BottomAppBar from '../BottomAppBar/BottomAppBar';
import Posts from "./post/posts";




const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    }

    return(
        <>
        <Banner />

        <Grid container>
            <Grid item lg={1.4} sm={2} xs={12}>
                <Categories onCategorySelect={handleCategorySelect}/>
            </Grid>

             <Grid  item xs={12} sm={10} lg={10}>
                <Posts Posts selectedCategory={selectedCategory}/>
             </Grid>

        </Grid>
        <BottomAppBar />
        </>
    )

}

export default Home;