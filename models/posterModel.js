const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    timestamp: { type: String, required: true },
    language: { type: String, required: true }
});

const Poster = mongoose.model('Poster', posterSchema);

module.exports = Poster;