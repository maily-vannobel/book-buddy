import React, { useState } from "react";
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <div className="book-component card mb-3" onClick={openModal}>
            <div className="card-body d-flex flex-column">
                <h3 className="book-title card-title">{book.titre}</h3>
                <p className="book-author card-text">{book.auteur}</p>
                <p className="book-state card-text">État: {book.etat}</p> {/* Affichage de l'état du livre */}
                {book.image && <img className="book-image card-img-top" src={book.image} alt={`${book.titre} cover`} />}
                <button className="favorite-button btn btn-primary mt-auto" onClick={(e) => { e.stopPropagation(); onFavoriteToggle(book) }}>
                    {book.favori ? "Retirer des favoris" : "Ajouter aux favoris"}
                </button>
            </div>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                contentLabel="Book Details Modal"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{book.titre}</h5>
                        <button type="button" className="close" onClick={closeModal}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Auteur: {book.auteur}</p>
                        <p>Nombre de pages: {book.nombre_de_pages}</p>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <div>
                                <label>État:</label>
                                <select className="form-control" value={newEtat} onChange={handleEtatChange}>
                                    <option value="À lire">À lire</option> 
                                    <option value="En cours de lecture">En cours de lecture</option>
                                    <option value="Fini">Fini</option>
                                </select>
                                </div>
                            </div>
                            {newEtat === "En cours de lecture" && (
                                <div className="form-group">
                                    <label>Dernière page lue:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={lastPageRead}
                                        onChange={handlePageReadChange}
                                        min="0"
                                        max={book.nombre_de_pages}
                                    />
                                    <div className="progress mt-2">
                                        <div 
                                            className="progress-bar" 
                                            role="progressbar" 
                                            style={{ width: `${((lastPageRead / book.nombre_de_pages) * 100).toFixed(2)}%` }}
                                            aria-valuenow={lastPageRead} 
                                            aria-valuemin="0" 
                                            aria-valuemax={book.nombre_de_pages}
                                        >
                                            {((lastPageRead / book.nombre_de_pages) * 100).toFixed(2)}%
                                        </div>
                                    </div>
                                </div>
                            )}
                            <button type="submit" className="btn btn-success">Mettre à jour</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Fermer</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default BookComponent;