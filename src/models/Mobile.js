import { Schema, model } from 'mongoose';

const mobileSchema = new Schema({
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
    country: { 
        type: String,
        required: [true, 'Country is required!'],
        enum: ['Bulgaria', 'Macedonia', 'Serbia', 'Romania', 'Greece'],
    },
    quantity: { 
        type: Number, 
        default: 0, 
        min: 0, 
        max: 1000 
    },
});

const Mobile = model('Mobile', mobileSchema);

export default Mobile;