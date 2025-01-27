import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'; // Add `.js` extension for ES Modules
import adminRoutes from './routes/adminRoutes.js'; // Add `.js` extension for ES Modules
import AdminSign from './routes/adminSign.js'; // Add `.js` extension for ES Modules
import UserSign from './routes/userSign.js'; // Add `.js` extension for ES Modules
import { MONGO_URI, PORTS } from './envfile.js';
dotenv.config();

const app = express();
const corsOptions = {
    origin: 'https://frontend-hackathon-microfinanaceapp.vercel.app/', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PATCH'], // Allowed HTTP methods
};

// Use CORS with options
app.use(cors(corsOptions));
app.use(express.json());
mongoose.connect(`${MONGO_URI}`, {
    serverSelectionTimeoutMS: 30000,  // Time to wait for MongoDB to select a server (5 seconds)
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err, "Error connecting to MongoDB"));

app.use('/api/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/adminsign', AdminSign);
app.use('/usersign', UserSign);

const PORT = PORTS || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
