import mongoose from 'mongoose';

const UserSignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String  },
    islogin: { type: Boolean, default: false },
});


const UserSign = mongoose.model('UserSign', UserSignSchema);

export default UserSign;
