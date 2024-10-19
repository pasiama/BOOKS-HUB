import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../assets/cover_not_found.jpg";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';


const URL = "https://www.googleapis.com/books/v1/volumes/";

const BookDetails = () => {
  const { id } = useParams();  // Get the book ID from the URL
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);  // Store book details
  const navigate = useNavigate();
  const { addToMyBooks} = useGlobalContext();

  function sanitizeHtml(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}
  useEffect(() => {
    setLoading(true);
    
    async function getBookDetails() {
      try {
        // Fetch data from Google Books API using the ID
        const response = await fetch(`${URL}${id}`);
        const data = await response.json();
        console.log(data);

        if (data) {
          const volumeInfo = data.volumeInfo;
          
          // Extract the necessary fields from the response
          const {
            title,
            authors,
            publisher,
            publishedDate,
            description,
            categories,
            imageLinks,
            pageCount,
            previewLink
          } = volumeInfo;

          const newBook = {
            title: title || "No title available",
            authors: authors ? authors.join(", ") : "No authors available",
            publisher: publisher || "No publisher available",
            publishedDate: publishedDate || "No published date available",
            description: sanitizeHtml(description) || "No description available",
            categories: categories ? categories.join(", ") : "No categories available",
            pageCount: pageCount || "No page count available",
            cover_img: imageLinks?.thumbnail || coverImg,
            previewLink: previewLink || "#"
          };
          setBook(newBook);  // Set the book details to the state
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    getBookDetails();
  }, [id]);

  let isPaused = false; // To track whether it's currently paused
  let utterance; // Declare the utterance outside to keep reference for pausing
  
  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      if (speechSynthesis.speaking && !isPaused) {
        // If it's speaking and not paused, pause the speech
        speechSynthesis.pause();
        isPaused = true;
      } else if (isPaused) {
        // If it's paused, resume the speech
        speechSynthesis.resume();
        isPaused = false;
      } else {
        // If it's not speaking, start the speech
        utterance = new SpeechSynthesisUtterance(book.description);
        utterance.pitch = 1.2; // Pitch level from 0 (low) to 2 (high)
        utterance.rate = 1; // Speed from 0.1 to 10
        speechSynthesis.speak(utterance);
  
        utterance.onend = () => {
          isPaused = false; // Reset when speech ends
        };
      }
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };
  

  if (loading) return <Loading />;

  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        {book ? (
          <div className='book-details-content grid'>
            <div className='book-details-img'>
              <img src={book.cover_img} alt="cover img" />
            </div>
            <div className='book-details-info'>
              <div className='book-details-item title'>
                <span className='fw-6 fs-24'>{book.title}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Authors: </span>
                <span>{book.authors}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Publisher: </span>
                <span>{book.publisher}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Published Date: </span>
                <span>{book.publishedDate}</span>
              </div>
              <div className='book-details-item description'>
                <span>{book.description || "no description available"}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Categories: </span>
                <span>{book.categories}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Page Count: </span>
                <span>{book.pageCount}</span>
              </div>
              <div className='book-details-item'>
                <span className='fw-6'>Preview: </span>
                <a href={book.previewLink} target="_blank" rel="noreferrer" className='text-italic'>Preview Link</a>
              </div>
              <div className='book-details-content grid'>
              <button onClick={() => addToMyBooks(book)}>Add to My Books</button> {/* Add to My Books */}
              <button onClick={handleReadAloud}>Read Description Aloud</button>

              </div>

            </div>

          </div>
        ) : (
          <p>No details available for this book.</p>
        )}
      </div>
    </section>
  );
}

export default BookDetails;
