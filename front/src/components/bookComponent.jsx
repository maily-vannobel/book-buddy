import React from 'react';
import '../css/bookComponent.css';

const BookComponent = ({ book }) => {
  return (
    <div className="book-component">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Status: {book.status}</p>
      <p>Total Pages: {book.totalPages}</p>
      <p>Category: {book.category}</p>
    </div>
  );
};

export default BookComponent;
