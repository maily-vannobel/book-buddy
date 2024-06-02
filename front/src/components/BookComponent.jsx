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
    const progressPercentage = (book.pageCourante / book.nombre_de_pages) * 100;

    return (
        <div className="book-component card mb-3">
            <div className="card-body d-flex flex-column">
                <div className="cardHeader " onClick={openModal}>
                    <h2 className="">{book.titre}</h2>
                    <h3 className="">{book.auteur}</h3>
                </div>
                  
                <div className="book-state-container">
                    <p className="book-state card-text">État: {book.etat}</p>
                    {book.etat === "En cours de lecture" && (
                        <div className="progress-container">
                            <div className="progress" style={{ height: '10px' }}>
                                <div 
                                    className="progress-bar" 
                                    role="progressbar" 
                                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                    aria-valuenow={lastPageRead} 
                                    aria-valuemin="0" 
                                    aria-valuemax={book.nombre_de_pages}
                                >
                                    {`${progressPercentage.toFixed(2)}%`}
                                </div>
                            </div>
                        </div>
                    )}
                </div>        
                {book.image && <img className="book-image card-img-top" src={book.image} alt={`${book.titre} cover`} onClick={openModal} />}                <button className="favorite-button" onClick={(e) => { e.stopPropagation(); onFavoriteToggle(book) }}>
                    <i className={book.favori ? "bi bi-heart-fill" : "bi bi-heart"}></i>
                </button>
            </div>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                contentLabel="Book Details Modal"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="">{book.titre}</h1>
                        <h2>{book.auteur}</h2>
                    </div>
                    <div className="modal-body">
                        <p className="resume">{book.resume}</p>
                        <p>Nombre de pages: {book.nombre_de_pages}</p>
                        <form onSubmit={handleFormSubmit}>
                            <div className="formGroup">
                                <div>
                                    <label>État</label>
                                    <select className="form-control" value={newEtat} onChange={handleEtatChange}>
                                        <option value="À lire">À lire</option> 
                                        <option value="En cours de lecture">En cours de lecture</option>
                                        <option value="Fini">Fini</option>
                                    </select>
                                </div>
                            </div>
                            {newEtat === "En cours de lecture" && (
                                <div >
                                    <label> Dernière page lue:</label>
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
