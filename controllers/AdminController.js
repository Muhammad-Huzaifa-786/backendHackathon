import nodemailer from 'nodemailer'; // Import nodemailer
import dotenv from 'dotenv';
import User from '../models/User.js'; // Adjust the path to your User model
dotenv.config(); // Load environment variables

export const GetAllUser = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json(users); // Send users as a response
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};


export const AdminAccept = async (req, res) => {
    const { id } = req.params; // Get user ID from request parameters

    try {
        // Update the user's AdminAccept property
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { AdminAccept: true }, // Set AdminAccept to true
            { new: true } // Return the updated user
        );

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
        // Extract the user's email
        const userEmail = updatedUser.email;

        // Set up the email transporter using your email service (e.g., Gmail)
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services like 'outlook', etc.
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Set up the email content
        const mailOptions = {
            from: process.env.SMTP_USER, // Replace with your email
            to: userEmail, // Send to the updated user's email
            subject: 'Admin Acceptance Notification',
            text: 'Your request has been accepted by the admin.',
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json(updatedUser); // Send back the updated user data
    } catch (error) {
        console.error('Error accepting user:', error);
        res.status(500).send("Server error");
    }
};
