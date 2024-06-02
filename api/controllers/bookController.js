const Book = require('../models/BookSchema');

// exports.getBookbyID 

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch(error) {
        res.status(500).json({ message: `Erreur lors de la récupération des livres, ${error}` });
    }
};

// Récupérer un livre par ID
exports.getBookByID = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`ID reçu : ${id}`); // Journaliser l'ID reçu

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'ID de livre invalide' });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de la récupération du livre, ${error}` });
    }
};

//recup un livre par filtre
exports.getBookByFilter = async (req, res) => {
    try {
        const { filter, value } = req.params;
        console.log(`Filtre reçu : ${filter}, Valeur reçue : ${value}`); // Journaliser le filtre et la valeur reçus

        const query = {};
        query[filter] = value;
        const books = await Book.find(query);

        if (books.length === 0) {
            return res.status(404).json({ message: 'Aucun livre trouvé' });
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de la récupération des livres par filtre, ${error}` });
    }
};
// Ajouter un livre
exports.addBook = async (req, res) => {
    console.log('Request body:', req.body); // Journaliser le corps de la requête
    try {
        const newBook = new Book(req.body);
        const book = await newBook.save();
        console.log('Book saved:', book); // Journaliser le livre ajouté
        res.status(201).json(book);
    } catch (error) {
        console.error('Error adding book:', error); // Journaliser les erreurs
        res.status(500).json({ message: `Erreur lors de l'ajout du livre, ${error}` });
    }
};

// Modifier l'état du livre
exports.updateBookState = async (req, res) => {
    try {
        const { id } = req.params;
        const { etat } = req.body;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'ID de livre invalide' });
        }

        const book = await Book.findByIdAndUpdate(id, { etat: etat }, { new: true });
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de la mise à jour de l'état du livre, ${error}` });
    }
};

// modifier page en cours de lecture
exports.updateReadingPage = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPage } = req.body;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'ID de livre invalide' });
        }

        const book = await Book.findByIdAndUpdate(id, { currentPage: currentPage }, { new: true });
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de la mise à jour de la page en cours de lecture, ${error}` });
    }
};

// Ajouter un livre aux favoris
exports.addBookToFavorites = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'ID de livre invalide' });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }

        book.isFavorite = true;
        await book.save();

        res.status(200).json({ message: 'Livre ajouté aux favoris', book });
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de l'ajout du livre aux favoris, ${error}` });
    }
};

exports.getBooksByCategory = async (req, res) => {
    try {
        const { categories } = req.query;
        const query = {};

        if (categories) {
            query.category = { $in: categories.split(',') };
        }

        const books = await Book.find(query);
        if (books.length === 0) {
            return res.status(404).json({ message: 'Aucun livre trouvé' });
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: `Erreur lors de la récupération des livres par catégorie, ${error}` });
    }
};