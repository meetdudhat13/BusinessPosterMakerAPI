const express = require('express');
const connectDB = require('./config/db');
const posterRoutes = require('./routes/posterRoutes');
const upcomingEventRoutes = require('./routes/upcomingEventRoutes');
const generalEventRoutes = require('./routes/generalEventRoutes');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use('/api', posterRoutes);
app.use('/api', upcomingEventRoutes);
app.use('/api', generalEventRoutes);

app.get("/",(req, res)=>{
    res.send("Hello");

})

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
