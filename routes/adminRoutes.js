import express from 'express';
import { AdminAccept, GetAllUser } from '../controllers/AdminController.js';

const router = express.Router();

// Admin routes
// In your adminRoutes file
router.patch('/user/:id/accept', AdminAccept); // Define the route to accept a user by ID
router.get('/get', GetAllUser); // Note: Use lowercase for consistency

export default router;
