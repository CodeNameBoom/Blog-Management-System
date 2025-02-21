
import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { API } from "../../../service/api";
import  {Link} from "react-router-dom";
import { useSearchParams } from "react-router-dom";

//components
import Post from "./post";



const Posts = () => {

    const [posts, setPosts] = useState([]);
    

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect( () => {
        const fetchData = async () => {
            let response = await API.getAllPosts({category: category || ''});
            console.log("Fetched Posts Data:", response.data);
            if(response.isSuccess){
                setPosts(response.data);
            }
        }
        fetchData();
    }, [category])

    return (
        <Grid container spacing={3} >
            {
                posts.length > 0 ? posts.map(post => (
                    <Grid item lg={2} sm={3} xs={9}>

                        <Link to={`details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Post post={post} />
                        </Link>
                    </Grid>
                )): <Box style={{color: '#878787', margin:'30px 80px', fontSize: 18}}>
                        No data available to display
                    </Box>
            }


        </Grid>
    )
}

export default Posts;