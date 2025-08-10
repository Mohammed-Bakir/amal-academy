import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js';

const app = express();
const PORT = 5004;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/amal-academy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('✅ MongoDB Connected');
}).catch(err => {
    console.log('❌ MongoDB Connection Error:', err.message);
});

// Debug registration endpoint
app.post('/api/auth/register', async (req, res) => {
    try {
        console.log('📝 Registration request received:', req.body);

        const { firstName, lastName, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            console.log('❌ User already exists');
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Create user
        const user = new User({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password
        });

        await user.save();
        console.log('✅ User created successfully');

        res.json({
            success: true,
            message: 'User registered successfully',
            user: { firstName, lastName, email },
            token: 'debug-token'
        });

    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`🔍 Debug server running on http://localhost:${PORT}`);
});