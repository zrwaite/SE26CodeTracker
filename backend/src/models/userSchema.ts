import mongoose from 'mongoose';
//user schema that defines the entity
const userSchema = new mongoose.Schema({
    access_token: {
        type: String,
        required: true,
    },
	refresh_token: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
}, { timestamps: true});

export default mongoose.model('Users', userSchema); //Export data formatting
