const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log('MongoDB Connected Successfully!');
        return true;

    } catch (error) {
        console.log('MongoDB Connection Failed:', error.message);
        console.log('Server will continue running without MongoDB.');
        return false;
    }
};

module.exports = connectDB;
