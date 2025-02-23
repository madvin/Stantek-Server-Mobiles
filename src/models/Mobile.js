import { Schema, model, Types } from 'mongoose';

const mobileSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true, 
    },
    partNumber: {
        type: String,
        required: [true, "Part Number is required!"],
        minLength: [5, "Part Number should be at least 5 characters long!"],
        maxLength: [22, "Part Number should be less than 20 characters long!"],
    },
    Bulgaria: { 
        type: Number, 
        default: 0, 
        min: 0, 
        max: 1000 },
    Macedonia: { 
        type: Number, 
        default: 0, 
        min: 0, 
        max: 1000 },
    Serbia: { 
        type: Number, 
        default: 0, 
        min: 0, 
        max: 1000 },
    Romania: { 
        type: Number, 
        default: 0, 
        min: 0, 
        max: 1000 },
    Greece: { 
        type: Number, 
        default: 0, 
        min: 0, 
        max: 1000 },
});

const Mobile = model('Mobile', mobileSchema);

export default Mobile;