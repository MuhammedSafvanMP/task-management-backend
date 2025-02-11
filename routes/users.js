import express from 'express';
import { createAUser, deleteUser, getAllUsers, getUserById, updateAUser } from '../controllers/users.controller.js';



const route = express.Router();

route.post('/users', createAUser);
route.get('/users', getAllUsers);
route.get('/users/:id', getUserById);
route.put('/users/:id', updateAUser);
route.delete('/users/:id', deleteUser);

export default route;