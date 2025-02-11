import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/auth.js'
import { connectToDatabase } from './db/db.js';
import usersRoute from './routes/users.js'
import taskRoute from './routes/task.js';

const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use('/api/auth', authRouter);
app.use('/api', usersRoute);
app.use('/api', taskRoute);


const PORT = process.env.PORT || 7000

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))