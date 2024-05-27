import React, { useEffect, useState } from 'react';
import BookComponent from '../components/bookComponent';

import '../css/bookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/books');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="book-list">
      {books.map(book => (
        <BookComponent key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
