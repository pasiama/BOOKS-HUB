import { useGlobalContext } from '../../context';
import { FaDeleteLeft } from 'react-icons/fa6';
import { useState } from 'react';
import Modal from 'react-modal';
import './MyBooksPage.css';

const MyBooksPage = () => {
    const { myBooks, removeFromMyBooks, setMyBooks } = useGlobalContext();
    const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility
    const [selectedBook, setSelectedBook] = useState(null); // State to store the selected book for editing
    const [comments, setComments] = useState(''); // State for comments
    const [notes, setNotes] = useState(''); // State for notes
    const [review, setReview] = useState(''); // State for review
    const [currentDate] = useState(new Date().toLocaleDateString()); // Current date
    const [isCurrentlyReading, setIsCurrentlyReading] = useState(
        selectedBook?.isCurrentlyReading || false
    );
    
    // Open the modal and populate the form with selected book data
    const openModal = (book) => {
        setSelectedBook(book);
        setComments(book.comments);
        setNotes(book.notes);
        setReview(book.review);
        setModalIsOpen(true);
    };

    // Close the modal after saving
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Function to update and save the book's info
    const saveBookInfo = () => {
        const updatedBook = {
            ...selectedBook,
            comments,
            notes,
            review,
            isCurrentlyReading,
            date: currentDate // Include the date
        };
    
        // Update the book in the myBooks array
        const updatedBooks = myBooks.map((book) =>
            book.title === updatedBook.title ? updatedBook : book
        );
    
        setMyBooks(updatedBooks); // Update the context state
    
        // Save to local storage
        localStorage.setItem('myBooks', JSON.stringify(updatedBooks));
    
        // Close the modal after saving
        closeModal();
    };
    

    return (
        <section className="my-books">
            <div className="container">
                <div className="section-title">
                    <h2>My Books</h2>
                </div>
                <div className="booklist-content grid">
                    {myBooks.length > 0 ? (
                        myBooks.map((book) => (
                            <div key={book.id || book.title} className="book-item">
                                <img src={book.cover_img} alt={book.title} />
                                <h3>{book.title}</h3>
                                
                                {/* Open the modal on clicking the book */}
                                <button onClick={() => openModal(book)}>Add/View Notes</button>
                                
                                {/* Remove Book Button */}
                                <button onClick={() => removeFromMyBooks(book.title)} className="remove-button grid">
                                    <FaDeleteLeft className='text-purple' size={32} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No books added yet.</p>
                    )}
                </div>
            </div>

            {/* Modal for adding/editing comments, notes, and review */}
            <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Book Details"
    ariaHideApp={false}
    className="modal"
    overlayClassName="modal-overlay"
>
    {selectedBook && (
        <div className="modal-content">
            <h2>{selectedBook.title}</h2>
            <p>Date: {currentDate}</p>

            {/* Comments Field */}
            <div className="input-group">
                <label>Comments:</label>
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add comments"
                />
            </div>

            {/* Notes Field */}
            <div className="input-group">
                <label>Notes:</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes"
                />
            </div>

            {/* Review Field */}
            <div className="input-group">
                <label>Review:</label>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Add review"
                />
            </div>

            {/* "Is Currently Reading" Toggle Switch */}
            <div className="input-group">
                <label>Is Currently Reading:</label>
                <input
                    type="checkbox"
                    checked={isCurrentlyReading}
                    onChange={(e) => setIsCurrentlyReading(e.target.checked)}
                />
            </div>

            {/* Display existing comments, notes, review */}
            <div className="existing-info">
                <h4>Previous Notes, Comments, and Reviews:</h4>
                <p><strong>Comments:</strong> {selectedBook.comments || "No comments yet"}</p>
                <p><strong>Notes:</strong> {selectedBook.notes || "No notes yet"}</p>
                <p><strong>Review:</strong> {selectedBook.review || "No review yet"}</p>
                <p><strong>Is Currently Reading:</strong> {selectedBook.isCurrentlyReading ? "Yes" : "No"}</p>
            </div>

            {/* Save Button */}
            <button onClick={saveBookInfo} className="save-button">Save</button>
            {/* Close Modal Button */}
            <button onClick={closeModal} className="close-button">Close</button>
        </div>
    )}
</Modal>

        </section>
    );
};

export default MyBooksPage;
