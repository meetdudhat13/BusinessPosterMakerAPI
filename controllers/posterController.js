const Poster = require('../models/posterModel');

const createPoster = async(req, res)=>{
    try {
        const { id, title, category, imageUrl, description, tags, timestamp, language } = req.body;
        const newPoster = new Poster({
            id, title, category, imageUrl, description, tags, timestamp, language
        });
        await newPoster.save();
        res.status(201).json({
            status: 'success',
            message: 'Poster created successfully.',
            data: newPoster,
            error: null,
            timestamp: new Date().toISOString()
        });  
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error creating poster.',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message
            },
            timestamp: new Date().toISOString()
        });
    }
}

const getPosters = async(req, res)=>{
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
}

const getPosterById = async (req, res) => {
    try {
        const poster = await Poster.findById(req.params.id);
        if (!poster) {
            return res.status(404).json({
                status: 'error',
                message: 'Poster not found.',
                error: {
                    code: 'NOT_FOUND',
                    details: 'Poster with the given ID not found.'
                },
                timestamp: new Date().toISOString()
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Poster fetched successfully.',
            data: poster,
            error: null,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching poster.',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message
            },
            timestamp: new Date().toISOString()
        });
    }
};

// Update a poster
const updatePoster = async (req, res) => {
    try {
        const updatedPoster = await Poster.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedPoster) {
            return res.status(404).json({
                status: 'error',
                message: 'Poster not found.',
                error: {
                    code: 'NOT_FOUND',
                    details: 'Poster with the given ID not found.'
                },
                timestamp: new Date().toISOString()
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Poster updated successfully.',
            data: updatedPoster,
            error: null,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error updating poster.',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message
            },
            timestamp: new Date().toISOString()
        });
    }
};

// Delete a poster
const deletePoster = async (req, res) => {
    try {
        const deletedPoster = await Poster.findByIdAndDelete(req.params.id);
        if (!deletedPoster) {
            return res.status(404).json({
                status: 'error',
                message: 'Poster not found.',
                error: {
                    code: 'NOT_FOUND',
                    details: 'Poster with the given ID not found.'
                },
                timestamp: new Date().toISOString()
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Poster deleted successfully.',
            data: null,
            error: null,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error deleting poster.',
            error: {
                code: 'INTERNAL_SERVER_ERROR',
                details: error.message
            },
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = { createPoster, getPosters, getPosterById, updatePoster, deletePoster };
