import mongoose from 'mongoose';
const Schema = mongoose.Schema;
//user schema that defines the entity

const statObjectSchema = new Schema ({
    name: String,
    time: Number
}, { timestamps: false, id: false, _id: false, minimize: false});

export default statObjectSchema;