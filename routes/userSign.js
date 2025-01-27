import express from 'express';
import { confirmToken, login, register } from '../controllers/UserSignController.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/confirm-token/:email', confirmToken);

export default router;
