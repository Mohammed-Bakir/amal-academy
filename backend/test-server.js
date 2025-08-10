import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5003;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Server is running!' });
});

app.post('/api/auth/register', (req, res) => {
    console.log('Registration attempt:', req.body);
    res.json({
        success: true,
        message: 'Registration successful',
        user: { firstName: 'Test', lastName: 'User' },
        token: 'test-token'
    });
});

app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
});