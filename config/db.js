const mongoose = require('mongoose');
require('dotenv').config();

const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected...' .cyan.underline.bold);
    }
    catch(err) {
        console.error(err.message .red.bold);
        process.exit(1);
    }
}


module.exports = {
    connectDB,
    mongoose
}
