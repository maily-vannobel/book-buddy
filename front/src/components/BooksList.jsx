import React, { useState, useEffect } from "react";
import BookComponent from './BookComponent';

function BooksList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function getBooks() {
            try {
                const response = await fetch('http://localhost:3001/api/books');
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books", error);
                setBooks([]);
            }
        }

        getBooks();
    }, []);

    const handleFavoriteToggle = async (book) => {
        const updatedBook = { ...book, favori: !book.favori };
        try {
            const response = await fetch(`http://localhost:3001/api/books/${book._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ favori: updatedBook.favori }),
            });
            if (response.ok) {
                setBooks((prevBooks) =>
                    prevBooks.map((b) => (b._id === book._id ? updatedBook : b))
                );
            } else {
                console.error("Failed to update favorite status");
            }
        } catch (error) {
            console.error("Error updating favorite status", error);
        }
    };

    const handleUpdateBook = async (bookId, updates) => {
        // Vérifier si les mises à jour incluent une nouvelle valeur pour l'état du livre
        // const newState = updates.etat;
        // if (newState === undefined || newState === null) {
        //   console.error("Failed to update the book's state: no new state value provided");
        //   return;
        // }
      
        try {
          const response = await fetch(`http://localhost:3001/api/book/${bookId}`, { 
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updates), // Envoyer uniquement la nouvelle valeur d'état à l'API
          });
      
          if (response.ok) {
            const updatedBook = await response.json();
            setBooks((prevBooks) =>
              prevBooks.map((book) =>
                book._id === bookId ? { ...book, ...updates } : book // Mettre à jour uniquement l'état du livre dans l'état local
              )
            );
          } else {
            console.error("Failed to update the book's state");
          }
        } catch (error) {
          console.error("Error updating book's state", error);
        }
      };
          return (
        <div>
            {books.map(book => (
                <BookComponent
                    key={book._id}
                    book={book}
                    onFavoriteToggle={handleFavoriteToggle}
                    onUpdateBook={handleUpdateBook}
                />
            ))}
        </div>
    );
}

export default BooksList;
