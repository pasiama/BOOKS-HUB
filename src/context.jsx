// import React, { useState, useContext, useEffect, useCallback } from 'react';
// import PropTypes from 'prop-types';

// const API_KEY = "AIzaSyAx4espej2iP9eK6qTfQGzOyDN4iXvww30";
// const URL = "https://www.googleapis.com/books/v1/volumes?q=";

// //const URL = "https://www.googleapis.com/books/v1/volumes?q=''&key='AIzaSyAx4espej2iP9eK6qTfQGzOyDN4iXvww30'+'&maxResults=40";
// const AppContext = React.createContext();

// const AppProvider = ({ children }) => {
//     const [searchTerm, setSearchTerm] = useState("the lost world");
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [resultTitle, setResultTitle] = useState("");

//     const setSearchTermAndStore = (term) => {
//         setSearchTerm(term);
//         localStorage.setItem("searchTerm", term);
//     };

//     const fetchBooks = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await fetch(`${URL}${encodeURIComponent(searchTerm)}&key=${API_KEY}&maxResults=40`);
//             const data = await response.json();
//             const { items } = data; // 'items' contains the books array

//             if (items) {
//                 const newBooks = items.slice(0, 20).map((bookSingle) => {
//                     const { id } = bookSingle;
//                     const { title, authors, publisher, imageLinks, description, publishedDate } = bookSingle.volumeInfo;
                    
//                     return {
//                         id: id,
//                         title: title || "No title available",
//                         author: authors ? authors.join(", ") : "Unknown author",
//                         publisher: publisher || "Unknown publisher",
//                         publishedDate: publishedDate || "No publish date",
//                         description: description || "No description available",
//                         thumbnail: imageLinks ? imageLinks.thumbnail : "No image available",
//                     };
//                 });
    
//                 setBooks(newBooks);
    
//                 if (newBooks.length > 0) {
//                     setResultTitle("Your Search Results");
//                     console.log(newBooks);
//                 } else {
//                     setResultTitle("No Search Result Found!");
//                 }
//             } else {
//                 setBooks([]);
//                 setResultTitle("No Search Result Found!");
//             }
    
//             setLoading(false);
//         } catch (error) {
//             console.error(error);
//             setLoading(false);
//         }
    
//     }, [searchTerm]);

//     // useEffect(() => {
//     //     fetchBooks();
//     // }, [searchTerm, fetchBooks]);

//     useEffect(() => {
//         const storedSearchTerm = localStorage.getItem("searchTerm");
//         if (storedSearchTerm) {
//             setSearchTerm(storedSearchTerm);
//         }
//         fetchBooks(); // Fetch books when the search term changes or on initial load
//     }, [fetchBooks]);

//     return (
//         <AppContext.Provider value={{
//             loading, books, setSearchTerm: setSearchTermAndStore, resultTitle, setResultTitle,
//         }}>
//             {children}
//         </AppContext.Provider>
//     );
// };

// AppProvider.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export const useGlobalContext = () => {
//     return useContext(AppContext);
// };

// export { AppContext, AppProvider };


import React, { useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
// import coverImg from "../../assets/cover_not_found.jpg";


const API_KEY = "AIzaSyAx4espej2iP9eK6qTfQGzOyDN4iXvww30";
const URL = "https://www.googleapis.com/books/v1/volumes?q=";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");
    const [myBooks, setMyBooks] = useState(() => {
        // Load from localStorage during initial state setup
        const storedBooks = localStorage.getItem('myBooks');
        return storedBooks ? JSON.parse(storedBooks) : [];
    }); // State to store selected books

    // Function to update searchTerm and store it in local storage
    const setSearchTermAndStore = (term) => {
        setSearchTerm(term);
        localStorage.setItem("searchTerm", term);
    };

    // const fetchBooks = useCallback(async () => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch(`${URL}${encodeURIComponent(searchTerm)}&key=${API_KEY}&maxResults=40`);
    //         const data = await response.json();
    //         const { items } = data;

    //         if (items) {
    //             const newBooks = items.slice(0, 20).map((bookSingle) => {
    //                 const { id } = bookSingle;
    //                 const { title, authors, publisher, imageLinks, description, publishedDate, categories } = bookSingle.volumeInfo;
                    
    //                 return {
    //                     id: id,
    //                     title: title || "No title available",
    //                     author: authors ? authors.join(", ") : "Unknown author",
    //                     publisher: publisher || "Unknown publisher",
    //                     publishedDate: publishedDate || "No publish date",
    //                     description: description || "No description available",
    //                     thumbnail: imageLinks ? imageLinks.thumbnail : "No image available",
    //                     categories: categories || "No categories available" // Categories field

    //                 };
    //             });

            
                
    //             setBooks(newBooks);

    //             if (newBooks.length > 0) {
    //             setResultTitle(`Search Results for: "${searchTerm}"`); // Set the search term as the result title
    //             } else {
    //                 setResultTitle("No Search Result Found!");
    //             }
    //         } else {
    //             setBooks([]);
    //             setResultTitle("No Search Result Found!");
    //         }

    //         setLoading(false);
    //     } catch (error) {
    //         console.error(error);
    //         setLoading(false);
    //     }
    // }, [searchTerm]);

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}${encodeURIComponent(searchTerm)}&key=${API_KEY}&maxResults=40`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const { items } = data;
            
            if (items) {
                // Handle successful data
                const newBooks = items.slice(0, 20).map((bookSingle) => {
                    const { id, volumeInfo } = bookSingle;
                    return {
                        id,
                        title: volumeInfo.title || "No title available",
                        author: volumeInfo.authors ? volumeInfo.authors.join(", ") : "Unknown author",
                        publisher: volumeInfo.publisher || "Unknown publisher",
                        publishedDate: volumeInfo.publishedDate || "No publish date",
                        description: volumeInfo.description || "No description available",
                        thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '../../assets/cover_not_found.jpg',
                        // categories: volumeInfo.categories || "No categories available",
                    };
                });
                setBooks(newBooks);
                setResultTitle(`Search Results for: "${searchTerm}"`);
            } else {
                setBooks([]);
                setResultTitle("No Search Result Found!");
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            setResultTitle("Failed to fetch books.");
        } finally {
            setLoading(false);
        }
    }, [searchTerm]);
    useEffect(() => {
        const storedSearchTerm = localStorage.getItem("searchTerm");
        if (storedSearchTerm) {
            setSearchTerm(storedSearchTerm);
        }
        fetchBooks(); // Fetch books when the search term changes or on initial load
    }, [fetchBooks]);
    
    // const addToMyBooks = (book) => {
    //     setMyBooks((prevBooks) => {
    //         // Check if the book is already in "My Books"
    //         const isBookInList = prevBooks.find((b) => b.id === book.id);
    //         if (!isBookInList) {
    //             const updatedBooks = [...prevBooks, book];
    //             localStorage.setItem('myBooks', JSON.stringify(updatedBooks)); // Save to localStorage
    //             // toast.success(`${book.title} added to My Books!`);
    //             return updatedBooks;   
    //                  }
    //         return prevBooks;
    //     });
    // };
    const addToMyBooks = (book) => {
        setMyBooks((prevBooks) => {
            // Get the currently stored books from localStorage (if available)
            const storedBooks = JSON.parse(localStorage.getItem('myBooks')) || [];
    
            // Check if the book is already in "My Books"
            const isBookInList = prevBooks.find((b) => b.title === book.title);
    
            if (!isBookInList) {
                // Update both local state and localStorage
                // const updatedBooks = [...storedBooks, book]; // Add new book to the array
                const updatedBooks = [...storedBooks, { ...book, comments: "", notes: "", review: "", isCurrentlyReading: false }];

                localStorage.setItem('myBooks', JSON.stringify(updatedBooks)); // Save to localStorage
    
                // Show alert that the book has been added
                window.alert(`${book.title} has been added to My Books!`);
    
                return [...prevBooks, book]; // Update the state to reflect the change
            } else {
                window.alert(`${book.title} is already in My Books!`);
            }
    
            return prevBooks; // Return previous state if book is already in the list
        });
    };
    
    // Ensure books are loaded from localStorage when component mounts
    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('myBooks')) || [];
        setMyBooks(storedBooks); // Initialize state with stored books
    }, []);
    
    
    
    // const removeFromMyBooks = (bookId) => {
    //     setMyBooks((prevBooks) => {
    //         const updatedBooks = prevBooks.filter((book) => book.id !== bookId);
    //         localStorage.setItem('myBooks', JSON.stringify(updatedBooks)); // Update localStorage

    //         const removedBook = prevBooks.find((book) => book.id === bookId);
    //         window.alert(`${removedBook.title} removed from My Books!`);
    //         return updatedBooks;
    //     });
    // };
    const removeFromMyBooks = (bookTitle) => {
        setMyBooks((prevBooks) => {
            // Filter the books based on title instead of id
            const updatedBooks = prevBooks.filter((book) => book.title !== bookTitle);
            console.log("!");
            // Update localStorage with the new list
            localStorage.setItem('myBooks', JSON.stringify(updatedBooks));
            console.log("!!");

            // Find the book that was removed to display the alert
            const removedBook = prevBooks.find((book) => book.title === bookTitle);
            
            if (removedBook) {
                window.alert(`${removedBook.title} removed from My Books!`);
            }
    
            return updatedBooks; // Return the updated book list
        });
    };
    
      // Load `myBooks` from localStorage when the app initializes
      useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('myBooks'));
        if (storedBooks) {
            setMyBooks(storedBooks); // Set the state to the stored books if available
        }
    }, []);

    // Save `myBooks` to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('myBooks', JSON.stringify(myBooks));
    }, [myBooks]);

    

    return (
        <AppContext.Provider value={{
            loading, books, setSearchTerm: setSearchTermAndStore, resultTitle, setResultTitle, myBooks, setMyBooks, addToMyBooks,  removeFromMyBooks, fetchBooks
        }}>
            {children}
        </AppContext.Provider>
    );
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
