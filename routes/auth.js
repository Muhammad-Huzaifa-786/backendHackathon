import express from 'express';
import { AddUser, getHistory, getSingleUser, updateGuarantor } from '../controllers/authcontroller.js'

const router = express.Router();

router.post('/Adduser', AddUser);
router.patch('/userUpdate/:id', updateGuarantor);
router.get('/user/:id', getSingleUser);
router.get('/gethistory/:id', getHistory);

export default router;
