const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import database connection
const connectDB = require('./config/db');

// Import task routes
const taskRoutes = require('./routes/TaskRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Backend Server is Running!');
});

// Connect task routes
app.use('/api/tasks', taskRoutes);

// Start server after database connects
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log('Server failed:', error.message);
        process.exit(1);
    }
};

startServer();