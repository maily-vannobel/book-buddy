import React, { useState, useEffect } from 'react';

function Autocompletion({ onSelectBook }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);


    const filterSuggestions = (query) => {
        if (query.trim() === "") {
            setSuggestions([]);
        } else {
            const filteredBooks = books.filter(book =>
                book.titre.toLowerCase().startsWith(query.toLowerCase())
            );
            setSuggestions(filteredBooks);
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <input
                type="text"
                className="form-control me-2"
                placeholder="Rechercher des livres"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);
                    filterSuggestions(value);
                }}
            />
            {suggestions.length > 0 && searchQuery.trim() !== "" && (
                <ul className="list-group" style={{ position: 'absolute', zIndex: 1, width: '100%' }}>
                    {suggestions.map((book) => (
                        <li key={book._id} className="list-group-item" onClick={() => onSelectBook(book)} style={{ cursor: 'pointer' }}>
                            {book.titre}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Autocompletion;
