const Book = require('../models/bookSchema');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

exports.getBooks = async (req, res) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  let userFavorites = [];
  
  if (token) {
      try {
          const decodedToken = jwt.verify(token, '1234azHgb');
          const userId = decodedToken.userId;
          const user = await User.findById(userId);
          if (user) {
              userFavorites = user.favorites;
          }
      } catch (error) {
          console.error('Error verifying token:', error);
      }
  }

  try {
      const books = await Book.find();
      const booksWithFavorites = books.map(book => ({
          ...book.toObject(),
          favori: userFavorites.includes(book._id.toString())
      }));
      res.status(200).json(booksWithFavorites);
  } catch (error) {
      res.status(500).json({ message: `Erreur lors de la récupération des livres, ${error}` });
  }
};
exports.getBooksFavorites = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // Obtenir le token JWT à partir des en-têtes de la requête
  try {
      const decodedToken = jwt.verify(token, '1234azHgb');
      const userId = decodedToken.userId;
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      const favoriteBooks = await Book.find({ _id: { $in: user.favorites } });
      res.status(200).json(favoriteBooks);
  } catch (error) {
      console.error('Erreur lors de la récupération des livres favoris:', error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des livres favoris' });
  }
};
exports.putBooksUpdate = async (req, res) => {
    try{
        const {id} = req.params;
        const update = req.body;
        const options = { new: true};
        const updatedBook = await Book.findByIdAndUpdate (id, update, options);
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
exports.putBooksUpdatePage = async (req, res) => {
    const bookId = req.params.id;
    const { pageCourante } = req.body; 
  
    try {
      const book = await Book.findById(bookId); // Recherche du livre dans la base de données
  
      if (!book) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
      book.pageCourante = pageCourante; // Mise à jour de la page en cours de lecture
  
      const updatedBook = await book.save(); // Sauvegarde du livre mis à jour dans la base de données
  
      res.status(200).json(updatedBook);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la page en cours de lecture:', error);
      res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la page en cours de lecture' });
    }
};
exports.postBooksAdd = async (req, res) => {
    try {
        const { titre, auteur, image, page, etat, genre } = req.body;
        const newBook = new Book({ titre, auteur, image, nombre_de_pages: page, etat, genre });
        await newBook.save();
        res.status(201).json({ message: 'Livre ajouté avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.postBookAddFavorites = async (req, res) => {
    const bookId = req.body.bookId; // Obtenir l'ID du livre à partir du corps de la requête
    const token = req.headers.authorization.split(' ')[1]; // Obtenir le token JWT à partir des en-têtes de la requête
  
    try {
      // Vérifiez si le token est valide et extraire l'ID de l'utilisateur
      const decodedToken = jwt.verify(token, '1234azHgb');
      const userId = decodedToken.userId;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Vérifiez si le livre est déjà dans la liste des favoris de l'utilisateur
      if (user.favorites.includes(bookId)) {
        return res.status(400).json({ message: 'Le livre est déjà dans les favoris de l\'utilisateur' });
      }

      user.favorites.push(bookId); // Ajoutez l'ID du livre à la liste des favoris de l'utilisateur

      const updatedUser = await user.save();

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du livre en favori:', error);
      res.status(500).json({ message: 'Erreur serveur lors de l\'ajout du livre en favori' });
    }
};
exports.deleteBooks = async (req, res) => {
  const bookId = req.params.id;
  const token = req.headers.authorization.split(' ')[1]; // Obtenir le token JWT à partir des en-têtes de la requête

  try {
      const decodedToken = jwt.verify(token, '1234azHgb');
      const userId = decodedToken.userId;

      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      user.favorites = user.favorites.filter(favId => favId.toString() !== bookId);  // Supprimer l'ID du livre de la liste des favoris de l'utilisateur

      const updatedUser = await user.save(); 
      res.status(200).json(updatedUser);
  } catch (error) {
      console.error('Erreur lors de la suppression du livre des favoris:', error);
      res.status(500).json({ message: 'Erreur serveur lors de la suppression du livre des favoris' });
  }
};