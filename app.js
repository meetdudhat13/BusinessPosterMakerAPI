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

app.get('/',async (req,res)=>{
    try {
        const posters = await Poster.find();
        res.status(200).json({
            status: 'success',
            message: 'Posters fetched successfully.',
            data: {
                posters,
                pagination: {
                    current_page: 1,
                    total_pages: 1,  // Update this if you implement pagination
                    total_items: posters.length,
                    items_per_page: posters.length
                }
            },
            error: null,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching posters.',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message
            },
            timestamp: new Date().toISOString()
        });
    }
})

// Routes

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
