import React, { useState, useEffect } from "react";
import "../css/bookForm.css";

function Favorites() {
    const [favoritesBooks, setFavoritesBooks] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function getFavoritesBooks() {
            try {
                if (!token) {
                    console.error("No token found in localStorage");
                    throw new Error("No token found");
                }

                console.log("Token found in localStorage:", token);

                const response = await fetch(
                    "http://localhost:3000/api/books/favorites",
                    {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                if (response.ok) {
                    setFavoritesBooks(data);
                } else {
                    console.error("Error in response:", data.message);
                }
            } catch (error) {
                console.error("Error in fetch request:", error);
                setFavoritesBooks([]);
            }
        }

        getFavoritesBooks();
    }, [token]);

    return (
        <div>
            <h1>Mes Favoris</h1>
            {Array.isArray(favoritesBooks) && favoritesBooks.length > 0 ? (
                favoritesBooks.map(book => (
                    <div key={book._id}>
                        <h3>{book.titre}</h3>
                        <p>{book.auteur}</p>
                        {book.image && (
                            <img src={book.image} alt={`${book.titre} cover`} />
                        )}
                    </div>
                ))
            ) : (
                <p>No favorites found</p>
            )}
        </div>
    );
}

export default Favorites;
