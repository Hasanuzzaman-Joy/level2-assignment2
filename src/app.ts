import express from 'express';
import { initDB } from './config/db';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); 

initDB();

export default app;