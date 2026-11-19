const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const connectDB = require('./config/db');

const taskRoutes = require('./routes/TaskRoutes');
const jsonTaskRoutes = require('./routes/jsonTaskRoutes');
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 5000;

// CORS
const allowedOrigins = [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        callback(new Error('Not allowed by CORS'));
    }
}));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'SPENDWISE Backend is Running!'
    });
});

// Database status
app.get('/api/health', (req, res) => {
    res.json({
        server: 'running',
        database: require('mongoose').connection.readyState === 1
            ? 'connected'
            : 'disconnected'
    });
});

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/json-tasks', jsonTaskRoutes);
app.use('/api/auth', authRoutes);

// External API
app.get('/api/exchange/rates', async (req, res) => {
    try {
        const response = await fetch(
            'https://open.er-api.com/v6/latest/INR'
        );

        if (!response.ok) {
            throw new Error('Exchange API request failed');
        }

        const data = await response.json();

        res.json({
            success: true,
            base: data.base_code,
            rates: {
                USD: data.rates.USD,
                EUR: data.rates.EUR,
                GBP: data.rates.GBP,
                AED: data.rates.AED
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`SPENDWISE backend running on port ${PORT}`);
});

// Connect MongoDB independently
connectDB()
    .then(() => {
        console.log('MongoDB connection process completed.');
    })
    .catch(error => {
        console.error('MongoDB connection failed:', error.message);
    });