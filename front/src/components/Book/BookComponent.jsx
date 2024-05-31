import React, { useState, useEffect } from "react";
import Modal from "react-modal";


function BookComponent(){
    const [ modalIsOpen, setModalIsOpen] = useState(false);
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [newEtat, setNewEtat] = useState("");
    const [lastPageRead, setLastPageRead] = useState(0);
    const token = localStorage.getItem('token');

    const openModal = (book) => {
        setSelectedBook(book);
        setNewEtat(book.etat);
        setLastPageRead(book.pageCourante || 0);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleEtatChange = (e) => {
        setNewEtat(e.target.value);
    };

    const handlePageReadChange = (e) => {
        setLastPageRead(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (selectedBook){
            try{
                const response = await fetch('http://localhost:3000/api/books/${selectedBook._id}', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ etat: newEtat, pageCourante: lastPageRead }),
                });
                if (response.ok){
                    const updatedBook = { ... selectedBook, etat: newEtat, pageCourante: lastPageRead };
                    setBooks((prevBooks) =>
                      prevBooks.map((book) =>
                        book._id === updatedBook._id ? updatedBook : book
                      )
                    );
                    setSelectedBook(updatedBook);
                } else {
                  console.error("Failed to update the book state");
                }
            } catch (error){
              console.error("Error updating book state", error);
            }
        }
    };

    const handleFavoriteToggle = async (book) =>{
        const isFavorite = book.favori;
        const url = isFavorite
            ? `http://localhost:3000/api/books/delete/${book._id}`
            : `http://localhost:3000/api/books/addfavorites`;

        const method = isFavorite ? "DELETE" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: !isFavorite ? JSON.stringify({ bookId: book._id }) : null,
            });
            if (response.ok) {
                setBooks((prevBooks) =>
                    prevBooks.map((b) =>
                        b._id === book._id ? { ...b, favori: !isFavorite } : b
                    )
                );
                console.log(`Book ${isFavorite ? 'removed from' : 'added to'} favorites successfully`);
            } else {
                console.error(`Failed to ${isFavorite ? 'remove the book from' : 'add the book to'} favorites`);
            }
        } catch (error) {
            console.error(`Error ${isFavorite ? 'removing the book from' : 'adding the book to'} favorites`, error);
        }
    };

    useEffect(() => {
        async function getBooks() {
            try {
                const response = await fetch(`http://localhost:3000/api/books`, {
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json",
                    }
                });
                const data = await response.json();

                setBooks(data);
                
            } catch (error) {
                console.error("Error", error);
                setBooks([]);
            }
        }

        getBooks();
    }, []);

    return(
        <div>
        {books.map(book => (
            <div key={book._id} onClick={() => openModal(book)}>
                <h3>{book.titre}</h3>
                <p>{book.auteur}</p>
                {book.image && <img src={book.image} alt={`${book.titre} cover`} />}
                <button onClick={(e) => {e.stopPropagation(); handleFavoriteToggle(book)}}>
                    {token && book.favori ? "Retirer des favoris" : "Ajouter aux favoris"}
                </button>
            </div>
        ))}
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            {selectedBook && (
                <>
                    <h2>{selectedBook.titre}</h2>
                    <p>Auteur: {selectedBook.auteur}</p>
                    <p>Nombre de pages: {selectedBook.nombre_de_pages}</p>
                    {/* Changement d'état du livre */}
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            État:
                            <select value={newEtat} onChange={handleEtatChange}>
                            <option value="à lire">À lire</option>
                            <option value="en cours de lecture">En cours de lecture</option>
                            <option value="fini">Fini</option>
                            </select>
                        </label>
                        {/* MAJ de la page en cours de lecture + progress bar */}
                        {newEtat === "en cours de lecture" && (
                                <>
                                    <label>
                                        Dernière page lue:
                                        <input
                                            type="number"
                                            value={lastPageRead}
                                            onChange={handlePageReadChange}
                                            min="0"
                                            max={selectedBook.nombre_de_pages}
                                        />
                                    </label>
                                    <div>
                                        Progression:
                                        <progress
                                            value={lastPageRead}
                                            max={selectedBook.nombre_de_pages}
                                        >
                                            {((lastPageRead / selectedBook.nombre_de_pages) * 100).toFixed(2)}%
                                        </progress>
                                    </div>
                                </>
                            )}
                        <button type="submit">Mettre à jour</button>
                        </form>
                        <button onClick={closeModal}>Fermer</button>
                </>
            )}
        </Modal>
    </div>
  );
}

export default BookComponent;