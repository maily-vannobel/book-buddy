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



//exports.