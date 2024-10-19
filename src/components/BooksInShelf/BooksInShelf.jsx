// import { useEffect, useState } from 'react';
// import { useGoogleBooks } from '../../GoogleBooksContext';

// import PropTypes from 'prop-types';
// import './BooksInshelf.css'

// const BooksInShelf = () => {
//   const { bookshelves, getBookshelves,  getBooksInBookshelf } = useGoogleBooks();
//   const [selectedBooks, setSelectedBooks] = useState([]);
//   const [ setQuotaExceeded] = useState(false); // To handle quota errors


//   useEffect(() => {
//       const fetchBookshelves = async () => {
//         try {
//           await getBookshelves(); // Fetch bookshelves from Google API
//         } catch (error) {
//           if (error.result?.error?.code === 429) {
//             console.error('Quota exceeded:', error);
//             setQuotaExceeded(true);
//           } else {
//             console.error('Error fetching bookshelves:', error);
//           }
//         }
//       };
  
//       fetchBookshelves();
//     }, [getBookshelves]); // Only run once when the component mounts
  
//     // Function to fetch books based on clicked bookshelf
//     const handleBookshelfClick = async (bookshelfId) => {
//       try {
//         const books = await getBooksInBookshelf(bookshelfId);
//         setSelectedBooks(books); // Update state with fetched books
//       } catch (error) {
//         if (error.result?.error?.code === 429) {
//           console.error(`Quota exceeded for shelf ${bookshelfId}:`, error);
//           setQuotaExceeded(true);
//         } else {
//           console.error(`Error fetching books in shelf ${bookshelfId}:`, error);
//         }
//       }
//     };// Only runs once when the component mounts
  

//   return (
//       <div className="home-container">
//         <div className="bookshelf-buttons">
//           {bookshelves.map((shelf) => (
//             <button 
//               key={shelf.id} 
//               onClick={() => handleBookshelfClick(shelf.id)} 
//               className="bookshelf-button"
//             >
//               {shelf.title}
//             </button>
//           ))}
//         </div>
  
//         <div className="bookshelf-details">
//           <h1>Books in Selected Shelf</h1>
//           {selectedBooks.length > 0 ? (
//             <ul>
//               {selectedBooks.map((book) => (
//                 <li key={book.id}>
//                   {book.volumeInfo.title} by {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : 'Unknown'}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No books available in this shelf.</p>
//           )}
//         </div>
//       </div>
//     );
// };
// BooksInShelf.propTypes = {
//       bookshelfId: PropTypes.string.isNotRequired,
// };
// export default BooksInShelf;


import { useEffect, useState } from 'react';
import { useGoogleBooks } from '../../GoogleBooksContext';

import './BooksInshelf.css';

const BooksInShelf = () => {
  const { bookshelves, getBookshelves, getBooksInBookshelf } = useGoogleBooks();
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [ setQuotaExceeded] = useState(false); // To handle quota errors

  // Fetch bookshelves only if they're not already loaded
  useEffect(() => {
    if (!bookshelves || bookshelves.length === 0) {
      const fetchBookshelves = async () => {
        try {
          await getBookshelves(); // Fetch bookshelves from Google API
        } catch (error) {
          if (error.result?.error?.code === 429) {
            console.error('Quota exceeded:', error);
            setQuotaExceeded(true);
          } else {
            console.error('Error fetching bookshelves:', error);
          }
        }
      };
      fetchBookshelves();
    }
  }, [bookshelves, getBookshelves]);

  // Function to fetch books based on clicked bookshelf
  const handleBookshelfClick = async (bookshelfId) => {
    try {
      const books = await getBooksInBookshelf(bookshelfId);
      setSelectedBooks(books); // Update state with fetched books
    } catch (error) {
      if (error.result?.error?.code === 429) {
        console.error(`Quota exceeded for shelf ${bookshelfId}:`, error);
        setQuotaExceeded(true);
      } else {
        console.error(`Error fetching books in shelf ${bookshelfId}:`, error);
      }
    }
  };

  return (
    <div className="home-container">
      <div className="bookshelf-buttons">
        {bookshelves.map((shelf) => (
          <button 
            key={shelf.id} 
            onClick={() => handleBookshelfClick(shelf.id)} 
            className="bookshelf-button"
          >
            {shelf.title}
          </button>
        ))}
      </div>

      <div className="bookshelf-details">
        <h1>Books in Selected Shelf</h1>
        {selectedBooks.length > 0 ? (
          <ul>
            {selectedBooks.map((book) => (
              <li key={book.id}>
                {book.volumeInfo.title} by {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : 'Unknown'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No books available in this shelf.</p>
        )}
      </div>
    </div>
  );
};


export default BooksInShelf;
