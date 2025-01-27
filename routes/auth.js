import express from 'express';
import { AddUser, getHistory, getSingleUser, updateGuarantor } from '../controllers/authController.js'
// import { register, login, forgotPassword, resetPassword,confirmToken } from '../controllers/authController.js'; // Add `.js` extension

const router = express.Router();
// router.get('/', (req, res) => {
//     res.send('Hello from auth routes');
// });
// router.post('/register', register);
// router.post('/login', login);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword);
// router.post('/confirm-token/:email', confirmToken);
router.post('/Adduser', AddUser);
router.patch('/userUpdate/:id', updateGuarantor);
router.get('/user/:id', getSingleUser);
router.get('/gethistory/:id', getHistory);

export default router;
