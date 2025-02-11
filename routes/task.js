import express from 'express';
import { AuserTask, createATask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/task.controller.js';



const route = express.Router();

route.post('/tasks',  createATask);
route.get('/tasks', getAllTasks);
route.get('/tasks/:id', getTaskById);
route.put('/tasks/:id',  updateTask);
route.delete('/tasks/:id', deleteTask);
route.get('/tasks/users/:id', AuserTask );

export default route;