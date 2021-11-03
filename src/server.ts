import express from 'express';
const app = express();
import cors from 'cors';
import memberRoutes from './routes/member.routes'; // routes

import dotenv from 'dotenv'; // environment variables
dotenv.config({ path: './config/.env' });
import './database/db'; //database
import path from 'path';

const corsOption = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['sessionId', 'Content-Type'],
    exposedHeaders: ['sessionId'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/member', memberRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

// server
app.listen(process.env.PORT, (): void => {
    console.log(`Listening on port ${process.env.PORT}`);
});
