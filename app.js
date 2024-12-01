const express = require('express');
const connectDB = require('./config/db');
const posterRoutes = require('./routes/posterRoutes');
const Poster = require('./models/posterModel')
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use('/api', posterRoutes);



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
