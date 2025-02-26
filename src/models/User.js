import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: [4, 'Username must be at least 4 characters!'],
        maxLength: [10, 'Username must be less than 10 characters'],
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Passowrd must be at least 6 characters!'],
        maxLength: [30, 'Passowrd must be less than 30 characters'],
    },
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;