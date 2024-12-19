const mongoose = require('mongoose');

const generalEventSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    timestamp: { type: String, required: true },
    language: { type: String, required: true }
});

const GeneralEventSchema = mongoose.model('GeneralEvent', generalEventSchema);

module.exports = GeneralEventSchema;