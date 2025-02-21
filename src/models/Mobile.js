import { Schema, model } from 'mongoose';

const mobileSchema = new Schema({
    IMEI:{
        type: String,
        required: [true, 'IMEI is required!'],
        minLength: [5, 'IMEI should be at least 5 characters long!'],
        maxLength: [20, 'IMEI should be less than 20 characters long!']
    }
    //TODO: import date and user created
});

const Mobile = model('Mobile', mobileSchema);

export default Mobile;