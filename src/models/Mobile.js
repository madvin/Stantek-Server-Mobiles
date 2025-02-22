import { Schema, model, Types } from 'mongoose';

const mobileSchema = new Schema({
    partNumber:{
        type: String,
        required: [true, 'Part Number is required!'],
        minLength: [5, 'Part Number should be at least 5 characters long!'],
        maxLength: [22, 'Part Number should be less than 20 characters long!'],
    },
    country: {
        type: String,
        required: true,
    },
    creator: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Mobile = model('Mobile', mobileSchema);

export default Mobile;