import React, { useState } from "react";
import Modal from 'react-modal';
import '../css/bookComponent.css';

Modal.setAppElement('#root');

function BookComponent({ book, onFavoriteToggle, onUpdateBook }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newEtat, setNewEtat] = useState(book?.etat || "");
    const [lastPageRead, setLastPageRead] = useState(book?.pageCourante || 0);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = (e) => {
        e.stopPropagation();
        setModalIsOpen(false);
    };

    const handleEtatChange = (e) => {
        setNewEtat(e.target.value);
    };

    const handlePageReadChange = (e) => {
        setLastPageRead(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (book) {
            console.log("Submitting updates for book:", book._id, { etat: newEtat, pageCourante: lastPageRead });
            onUpdateBook(book._id, { etat: newEtat, pageCourante: lastPageRead });
        }
        closeModal(e);
    };

    if (!book) {
        return null;
    }

    return (
        <div className="book-component" onClick={openModal}>
            <h3 className="book-title">{book.titre}</h3>
            <p className="book-author">{book.auteur}</p>
            <p className="book-state">État: {book.etat}</p> {/* Affichage de l'état du livre */}
            {book.image && <img className="book-image" src={book.image} alt={`${book.titre} cover`} />}
            <button className="favorite-button" onClick={(e) => { e.stopPropagation(); onFavoriteToggle(book) }}>
                {book.favori ? "Retirer des favoris" : "Ajouter aux favoris"}
            </button>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                contentLabel="Book Details Modal"
            >
                <h2 className="modal-title">{book.titre}</h2>
                <p className="modal-author">Auteur: {book.auteur}</p>
                <p className="modal-pages">Nombre de pages: {book.nombre_de_pages}</p>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        État:
                        <select value={newEtat} onChange={handleEtatChange}>
                            <option value="à lire">À lire</option>
                            <option value="en cours de lecture">En cours de lecture</option>
                            <option value="fini">Fini</option>
                        </select>
                    </label>
                    {newEtat === "en cours de lecture" && (
                        <>
                            <label>
                                Dernière page lue:
                                <input
                                    type="number"
                                    value={lastPageRead}
                                    onChange={handlePageReadChange}
                                    min="0"
                                    max={book.nombre_de_pages}
                                />
                            </label>
                            <div>
                                Progression:
                                <progress value={lastPageRead} max={book.nombre_de_pages}>
                                    {((lastPageRead / book.nombre_de_pages) * 100).toFixed(2)}%
                                </progress>
                            </div>
                        </>
                    )}
                    <button type="submit">Mettre à jour</button>
                </form>
                <button onClick={(e) => closeModal(e)}>Fermer</button>
            </Modal>
        </div>
    );
}

export default BookComponent;