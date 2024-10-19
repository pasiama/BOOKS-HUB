import { useState, useEffect } from 'react';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import BookList from '../../components/BookList/BookList'; // Your book display component
import { useGlobalContext } from '../../context';


const BooksPage = () => {
  const [books] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const { fetchBooks } = useGlobalContext();

  // Fetch books from the API (your existing fetch function)
  useEffect(() => {
    fetchBooks(); // Assuming fetchBooks is a function that fetches books
  }, []);

  // Update filteredBooks based on selected category or books change
  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredBooks(books); // If no category is selected, show all books
    } else {
      const filtered = books.filter((book) =>
        book.categories && book.categories.includes(selectedCategory)
      );
      setFilteredBooks(filtered);
    }
  }, [selectedCategory, books]);

  // Extract unique categories from books
  const uniqueCategories = Array.from(
    new Set(books.flatMap((book) => book.categories || []))
  );

  return (
    <div>
      {/* Pass unique categories and setSelectedCategory function to the CategoryFilter component */}
      <CategoryFilter
        categories={uniqueCategories}
        setSelectedCategory={setSelectedCategory}
      />
      {/* Pass filteredBooks to the BookList component */}
      <BookList books={filteredBooks} />
    </div>
  );
};

export default BooksPage;
