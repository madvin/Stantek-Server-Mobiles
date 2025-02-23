import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = 'koFOFKogksdm3226jkpolmsdpgmOGSPOGMgsdlgsmdg';

export default {
    async register(userData) {
        
            const userCount = await User.countDocuments({ username: userData.username });
            if (userCount > 0) {
                throw new Error ('Username already taken!');
            }
            return User.create(userData);
        },
    async login(userData) {
        const user = await User.findOne({ username: userData.username});
        
        if (!user) {
            throw new Error ('Invalid username or passowrd');
        }

        const isValid = await bcrypt.compare(userData.password, user.password);
        if (!isValid) {
            throw new Error ('Invalid username or password');
        }
        const payload = {
            id: user.id,
            username: user.username,
        }
        const token = jwt.sign(payload, SECRET);

        return token;
    }
}; 


    
    

