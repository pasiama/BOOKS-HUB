/* eslint-disable react/prop-types */
// import { createContext, useContext, useEffect, useState } from 'react';
// import { gapi } from 'gapi-script';
// import PropTypes from 'prop-types';


// export const GoogleBooksContext = createContext();

// export const useGoogleBooks = () => {
//   return useContext(GoogleBooksContext);
// };

// export const GoogleBooksProvider = ({ children }) => {
//   const [bookshelves, setBookshelves] = useState([]);
//   const [books] = useState([]);
//   const clientId = "143320324811-5160kedjeas2l33vous3gk39bbslpcbl.apps.googleusercontent.com";
//   const apiKey = "AIzaSyAx4espej2iP9eK6qTfQGzOyDN4iXvww30";
//   useEffect(() => {
//     const initClient = () => {
//       gapi.client.init({
//         apiKey: apiKey,
//         clientId: clientId,
//         discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/books/v1/rest"],
//         scope: "https://www.googleapis.com/auth/books",
//       }).then(() => {
//         // Optionally: Automatically load bookshelves once initialized
//         getBookshelves();
//       });
//     };

//     gapi.load("client:auth2", initClient);
//   }, []);

// const getBookshelves = async () => {
//     try {
//       const response = await gapi.client.books.mylibrary.bookshelves.list();
      
//       // Safeguard against undefined or missing items in the response
//       if (response.result && response.result.items) {
//         setBookshelves(response.result.items);  // Set the bookshelves if they exist
//       } else {
//         setBookshelves([]); // Set to empty array if no bookshelves found
//       }
//     } catch (error) {
//       console.error("Error fetching bookshelves:", error);
//       setBookshelves([]); // Handle error by setting bookshelves to empty array
//     }
//   };

//   // Function to get books from a specific bookshelf
//   const getBooksInBookshelf = async (bookshelfId) => {
//     try {
//       const response = await gapi.client.books.mylibrary.bookshelves.volumes.list({
//         shelf: bookshelfId,
//       });

//       // Safeguard against undefined or missing items in the response
//       if (response.result && response.result.items) {
//         return response.result.items;  // Return the books if they exist
//       } else {
//         return []; // Return empty array if no books found
//       }
//     } catch (error) {
//       console.error(`Error fetching books in shelf ${bookshelfId}:`, error);
//       return []; // Handle error by returning an empty array
//     }
//   };
//   return (
//     <GoogleBooksContext.Provider value={{ bookshelves, books, getBookshelves, getBooksInBookshelf }}>
//       {children}
//     </GoogleBooksContext.Provider>
//   );

// };

// GoogleBooksProvider.propTypes = {
//       children: PropTypes.node.isRequired,
// };



// import { createContext, useContext, useEffect, useState } from 'react';
// import { gapi } from 'gapi-script';

// export const GoogleBooksContext = createContext();

// export const useGoogleBooks = () => {
//   return useContext(GoogleBooksContext);
// };

// export const GoogleBooksProvider = ({ children }) => {
//   const [bookshelves, setBookshelves] = useState([]);
//   const clientId = "143320324811-5160kedjeas2l33vous3gk39bbslpcbl.apps.googleusercontent.com";
//   const apiKey = "AIzaSyAx4espej2iP9eK6qTfQGzOyDN4iXvww30";

//   useEffect(() => {
//     const initClient = () => {
//       gapi.client.init({
//         apiKey: apiKey,
//         clientId: clientId,
//         discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/books/v1/rest"],
//         scope: "https://www.googleapis.com/auth/books",
//       }).then(() => {
//         // Fetch bookshelves when initialized
//         if (!bookshelves.length) {
//           getBookshelves();
//         }
//       });
//     };

//     gapi.load("client:auth2", initClient);
//   }, [bookshelves]); // Run only when bookshelves are empty

//   const getBookshelves = async () => {
//     try {
//       const response = await gapi.client.books.mylibrary.bookshelves.list();
//       if (response.result && response.result.items) {
//         setBookshelves(response.result.items); // Set the bookshelves
//       } else {
//         setBookshelves([]); // Empty array if no bookshelves found
//       }
//     } catch (error) {
//       console.error("Error fetching bookshelves:", error);
//       setBookshelves([]); // Error handling
//     }
//   };

//   const getBooksInBookshelf = async (bookshelfId) => {
//     try {
//       const response = await gapi.client.books.mylibrary.bookshelves.volumes.list({
//         shelf: bookshelfId,
//       });
//       if (response.result && response.result.items) {
//         return response.result.items; // Return the books
//       } else {
//         return []; // No books found
//       }
//     } catch (error) {
//       console.error(`Error fetching books in shelf ${bookshelfId}:`, error);
//       return []; // Error handling
//     }
//   };

//   return (
//     <GoogleBooksContext.Provider value={{ bookshelves, getBookshelves, getBooksInBookshelf }}>
//       {children}
//     </GoogleBooksContext.Provider>
//   );
// };

