

import { Api } from "@mui/icons-material";
import axios from "axios";


const UpdateImage = (imageId, newImageUrl) => {

    const [imagePreview, setImagePreview] = useState(null);


    useEffect(() => {
        const fetchPostDetails = async () => {
          try {
            const response = await API.getPostById(postId);  // Fetch post by ID from API
            if (response?.data?.post) {
              setPost(response.data.post);
              setImagePreview(response.data.post.image); // Set current image as preview
            }
          } catch (error) {
            console.error('Error fetching post details:', error);
            setMessage('Failed to fetch post details');
          }
        };
    return(
        <div>

        </div>
    )
}

export default UpdateImage ;