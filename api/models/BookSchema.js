const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: String,
    status: { type: String, required: true },
    totalPages: { type: Number, required: true },
    currentPage: { type: Number, default: 0 },
    category: String,
    resume: String,
});

module.exports = mongoose.model('Book', bookSchema, 'book');