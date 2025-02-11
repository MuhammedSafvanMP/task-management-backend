import express from 'express';
import { login, verify } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const route = express.Router();

route.post('/login', login);
route.get('/verify', authMiddleware, verify);

export default route;