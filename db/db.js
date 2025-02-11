import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected");
        
    } catch (error) {
        console.log(error);
    }
}