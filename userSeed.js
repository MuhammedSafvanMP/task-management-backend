import { connectToDatabase } from './db/db.js';
import User from './models/user.model.js';
import bycrpt from 'bcrypt';


const userRegister = async () => {

    connectToDatabase()
    try {
        const hashPassword = await bycrpt.hash('admin', 10);

        const newUser = new User ({
            name: 'Admin',
            email: 'admin@gmail.com',
            password: hashPassword,
            role: 'admin'
        })
        await newUser.save();
    } catch (error) {
        console.log(error);
        
    }
}



userRegister()