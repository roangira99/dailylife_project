import mongoose from 'mongoose';

// creating a mongoose schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String], // An array of strings
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createsAt: {
        type: Date,
        default: new Date()
    },
});

// Turning the schema into a model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage; 