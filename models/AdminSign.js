import mongoose from 'mongoose';

const AdminSignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String  },
    islogin: { type: Boolean, default: false },
});


const AdminSign = mongoose.model('AdminSign', AdminSignSchema);

export default AdminSign;
