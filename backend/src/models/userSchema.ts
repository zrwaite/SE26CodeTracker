import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import statObjectSchema from "./statObjectSchema";


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
        type: [statObjectSchema],
    },
    languages: {
        type: [statObjectSchema],
    },
    os: {
        type: [statObjectSchema],
    },
    days: {
        type: [{
            date: Date,
            time: Number,
            languages: [statObjectSchema]
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
    initialized: {
        type: Boolean,
        default: false,
    },
    hash: {
        type: String,
        required: true,
    },
    confirmation_code: {
        type: String,
        required: true,
    },
    email_confirmed: {
        type: Boolean,
        default: false,
    },
    anonymous: {
        type: Boolean,
        default: false,
    },
    email_notifications: {
        type: Boolean,
        default: true,
    },
    stats: {
        type: statsSchema,
        required: true,
    }
}, { timestamps: false, minimize: false});

const Users = mongoose.model('Users', userSchema)
export {Users}
