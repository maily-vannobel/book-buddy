const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

//GET pour récupérer tous les livres
router.get('/books', bookController.getAllBooks);
//GET pour récupérer un livre par ID
router.get('/books/:id', bookController.getBookByID);

//GET pour recup livre par filtre
router.get('/books/filter/:filter/:value', bookController.getBookByFilter); 

//POST pour ajouter un nouveau livre
router.post('/addBooks', bookController.addBook);
//PUT pour modifier l'état du livre
router.put('/book/:id', bookController.updateBookState);
//PUT pour modifier la page en cours de lecture
router.put('/book/status/:id', bookController.updateReadingPage);

//POST:ajouter un livre aux favoris
router.post('/book/:id', bookController.addBookToFavorites);module.exports = router;

router.get('/booksByCategory', bookController.getBooksByCategory)