
import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
    }

});



const Post = mongoose.model('post', postSchema);

export default Post;