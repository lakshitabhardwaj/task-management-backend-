const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import database connection
const connectDB = require('./config/db');

// Import task routes
const taskRoutes = require('./routes/TaskRoutes');
const jsonTaskRoutes = require('./routes/jsonTaskRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Backend Server is Running!');
});

// Connect task routes
app.use('/api/tasks', taskRoutes);
app.use('/api/json-tasks', jsonTaskRoutes);

// Start server after database connects
// Start Express server independently
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Connect MongoDB separately
connectDB()
    .then(() => {
        console.log('MongoDB is ready!');
    })
    .catch((error) => {
        console.log('MongoDB connection failed:', error.message);
        console.log('JSON APIs are still available.');
    });