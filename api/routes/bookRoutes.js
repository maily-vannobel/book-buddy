const express = require('express');
const bookController = require('../controllers/bookController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/books', bookController.getBooks); // Route GET pour récupérer tous les livres
router.get('/books/favorites', authenticateToken, bookController.getBooksFavorites); // Route pour recup les livres favoris
router.put('/books/:id', bookController.putBooksUpdate); // Route pour mettre à jour un livre
router.put('/books/status/:id', bookController.putBooksUpdatePage); // Route pour MAJ de la page en cours de lecture
router.post('/books/addBook', bookController.postBooksAdd); //Route pour ajouter un livre dans la collection
router.post('/books/addfavorites', authenticateToken ,bookController.postBookAddFavorites); // Route pour ajouter le livre en favori
router.delete('/books/delete/:id', authenticateToken, bookController.deleteBooks); // Route pour supprimer le livre de la liste des favoris :

module.exports = router;