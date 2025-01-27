import express from 'express';
import { register,confirmToken,login } from '../controllers/AdminSignController.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/confirm-token/:email', confirmToken);

export default router;
