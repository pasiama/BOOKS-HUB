import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Loading from "../Loader/Loader";
import "./BookList.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const navigate = useNavigate();
  const { books, loading, resultTitle } = useGlobalContext();
  if (loading) return <Loading />;

  return (
    <section className="booklist">
      <div className="container">
      <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/home")}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>
        <div className="section-title">
          <h2>{resultTitle}</h2>
        </div>
        <div className="booklist-content grid">
          {books.length > 0 ? (
            books.map((book) => (
              <Link to={`/book/${book.id}`} key={book.id} className="book-item">
                <div className="image-container">
                  {" "}
                  {/* Added a container for images */}
                  <img
                    src={book.thumbnail || "../../assets/cover_not_found.jpg"}
                    alt={book.title}
                    onError={(e) => {
                      e.target.src = "../../assets/cover_not_found.jpg"; // Fallback image if loading fails
                    }}
                  />
                </div>
                <h3>{book.title}</h3>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Publisher:</strong> {book.publisher}
                </p>
                <p>
                  <strong>Published Date:</strong> {book.publishedDate}
                </p>
              </Link>
            ))
          ) : (
            <p>{resultTitle}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookList;
