import mongoose from 'mongoose';

// creating a mongoose schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String], // An array of strings
    selectedFile: String,
    likes: {
        type: {String},
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

// Turning the schema into a model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage; 