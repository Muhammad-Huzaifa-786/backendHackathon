import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'; // Add `.js` extension for ES Modules
import adminRoutes from './routes/adminRoutes.js'; // Add `.js` extension for ES Modules
import AdminSign from './routes/adminSign.js'; // Add `.js` extension for ES Modules
import UserSign from './routes/userSign.js'; // Add `.js` extension for ES Modules
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(`${process.env.MONGO_URI}`)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err, "error hai"));

app.use('/api/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/adminsign', AdminSign);
app.use('/usersign', UserSign);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
