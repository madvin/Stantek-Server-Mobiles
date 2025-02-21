import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        require: true,
        minLength: [4, 'Username must be at least 4 characters!'],
        maxLength: [10, 'Username must be less than 10 characters']
    },
    password: {
        minLength: [6, 'Passowrd must be at least 6 characters!'],
        maxLength: [30, 'Passowrd must be less than 30 characters']
    }

    //TODO: user connection to phones created
})