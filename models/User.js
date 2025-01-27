import mongoose from 'mongoose';

const GuarantorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    cnic: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    loanType: {
        type: String
    },
    email: {
        type: String,
    },
    cnic: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'], // Restrict values to these options
    },
    loanAmount: {
        type: Number,
    },
    returnTime: {
        type: Number, // Duration in months
    },
    AdminAccept: {
        type: Boolean, // Duration in months
    },
    password: {
        type: String, // Duration in months
    },
    city: {
        type: String, // Duration in months
    },
    guarantors: [GuarantorSchema], // This creates an array of guarantor objects
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

export default User;
