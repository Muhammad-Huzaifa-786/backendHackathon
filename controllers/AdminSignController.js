import User from '../models/AdminSign.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const tokenss = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            token: tokenss,
            isLogin: false,
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Token',
            html: `
                <h2>Token</h2>
                <p>${tokenss}</p>
                <p>This token will expire in 15 minutes.</p>
            `,
        };
        console.log(mailOptions);

        await transporter.sendMail(mailOptions);

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
};

export const confirmToken = async (req, res) => {
    try {
        const { email } = req.params; // Extract email from URL params
        const { token } = req.body; // Extract token from the body

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        // Check if the token matches the user's token
        if (token === user.token) {
            return res.status(200).json({ message: "Valid Token, Thank you" });
        } else {
            return res.status(400).json({ message: "Invalid Token, Sorry" });
        }

    } catch (error) {
        console.error('Error during token confirmation:', error);
        res.status(500).json({ error: 'Error confirming token' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
};
