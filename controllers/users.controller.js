import User from "../models/user.model.js";
import crypto from "crypto";
import bycrpt from 'bcrypt';
import { sendMail } from "../lib/nodeMailer.js";


// Function to generate a random password
const generateRandomPassword = (length = 12) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
};

// Create a new user
export const createAUser = async (req, res) => {
    try {
        const { email, name } = req.body;

    
        const randomPassword = generateRandomPassword();

        const newUser = new User({
            email,
            name,
            password: await bycrpt.hash(randomPassword, 5),
            role: 'user'
        });

        await newUser.save();

        const data = {
            email: email ,
            subject: "your password",
            text: `your password ${randomPassword}`,
          };
          await sendMail(data);

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; 

    
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const users = await User.find({role: "user"})
            .skip((pageNumber - 1) * limitNumber) 
            .limit(limitNumber); 

        const totalUsers = await User.countDocuments(); 

        res.status(200).json({
            totalUsers,
            totalPages: Math.ceil(totalUsers / limitNumber),
            currentPage: pageNumber,
            users
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};


// Get a single user by ID
export const getUserById = async (req, res) => {
    try {
       
        
        const user = await User.findById({_id: req.params.id });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

// Update a user
export const updateAUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};
