import mongoose from 'mongoose';
const Schema = mongoose.Schema;
//user schema that defines the entity
const statsSchema = new Schema({
    week_winners: {
        type: [{
            username: String,
            date: Date,
        }],
        default: [],
    },
    day_order: {
        type: [{
            username: String,
        }],
    },
    total_day_time: {
        type: Number,
        default: 0,
    },
    total_week_time: {
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


const groupSchema = new Schema({
    display_name: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    stats: {
        type: statsSchema,
        required: true,
    },
    users: {
        type: [String],
        default: []
    },
}, { timestamps: false, minimize: false});

const Groups = mongoose.model('Groups', groupSchema)
export {Groups}
