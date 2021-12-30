import mongoose from 'mongoose';
const Schema = mongoose.Schema;
//user schema that defines the entity
const statsSchema = new Schema({
    wins: {
        type: Number,
        default: 0,
    },
    total_time: {
        type: Number,
        default: 0,
    },
    day_time: {
        type: Number,
        default: 0,
    },
    week_time: {
        type: Number,
        default: 0,
    },
	editors: {
        type: [{
            name: String,
            time: Number
        }],
    },
    languages: {
        type: [{
            name: String,
            time: Number
        }],
    },
    os: {
        type: [{
            name: String,
            time: Number
        }],
    },
    days: {
        type: [{
            date: Date,
            time: Number
        }],
    },
}, { timestamps: false, id: false, _id: false, minimize: false});


const userSchema = new Schema({
    access_token: {
        type: String,
        required: true,
        unique: true,
    },
	refresh_token: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    created_at: {
        type: String,
        required: true,
    },
    display_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    stats: {
        type: statsSchema,
        required: true,
    }
}, { timestamps: false, minimize: false});

const Users = mongoose.model('Users', userSchema)
export {Users}
