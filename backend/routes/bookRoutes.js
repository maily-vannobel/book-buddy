const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

// Route GET pour récupérer tous les livres
router.get('/books', bookController.getAllBooks);

module.exports = router;