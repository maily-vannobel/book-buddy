import React, { useState, useEffect } from 'react';

function Favorites(){
    const [favoritesBooks, setFavoritesBooks] = useState([]);

    useEffect(() => {
        async function getFavoritesBooks(){
            try{
                const token = localStorage.getItem('token'); //Affiche les fav de l'utilisateur connecté
                const response = await fetch ('http://localhost:3000/api/books/favorites', {
                    headers: {
                        'Authorization': token,
                    },
                });
                const data = await response.json();
                console.log(data)
                setFavoritesBooks(data); //MAJ de l'état avec les données recupérées
            } catch (error) {
                console.error("Error", error);
                setFavoritesBooks([]) //Réinitialise l'état en cas d'erreur 
            }
        }

        getFavoritesBooks();
    }, []);

    return (
    <div>
        <h1>Mes Favoris</h1>
        {favoritesBooks.map((book) => (
            <div key={book._id}>
                <h3>{book.titre}</h3>
                <p>{book.auteur}</p>
                {book.image && <img src={book.image} alt={`${book.titre} cover`} />}
            </div>
        ))}
    </div>
  );
}

export default Favorites;