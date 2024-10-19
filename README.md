---
# 📚 BookHub

**BookHub** is an online book library that allows users to search for books using the Google Books API. Users can save books to their personal library, manage their collections, leave comments, notes, and reviews, and keep track of their reading status.

## 🚀 Features

- 🔍 **Search Books**: Users can search for books using the Google Books API.
- 📚 **Add to My Books**: Save books to your personal library.
- 📝 **Comments, Notes, and Reviews**: Add, edit, and delete notes and reviews for books in your library.
- 🔖 **Track Reading Progress**: Toggle the "Currently Reading" status for each book.
- 🗑️ **Remove Books**: Remove books from your library when you no longer need them.
- 🖼️ **Custom Book Covers**: Automatically display a default image if no cover image is available.
- 📅 **Timestamps**: View the date of your reviews and notes within the modal.

## 🛠️ Technologies Used

- **Frontend**: React.js
- **API**: Google Books API
- **Styling**: CSS
- **Icons**: React Icons
- **Browser Storage**: localStorage for persisting user data

## 💻 Setup and Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/YOUR-USERNAME/bookhub.git
   cd bookhub
   ```
2. **Install dependencies**:

   ```bash
   npm install
   ```
3. **Create a `.env` file** in the root directory and add your Google Books API key:

   ```bash
   REACT_APP_GOOGLE_BOOKS_API_KEY=your-api-key-here
   ```
4. **Run the project locally**:

   ```bash
   npm start
   ```
5. Open your browser and go to `http://localhost:3000`.

## 📦 How to Use

1. **Search for books**: Enter a book title, author, or keyword in the search bar.
2. **Add books to My Books**: Click on a book to add it to your personal library.
3. **Manage books**: Open any book in your library to add comments, notes, and reviews.
4. **Track progress**: Mark books as "Currently Reading" using the toggle feature.
5. **Remove books**: If a book is no longer needed, click the remove button to delete it from your library.

## 📝 Future Enhancements

- **Bookshelf Integration**: Add a virtual bookshelf to categorize and filter books.
- **User Authentication**: Allow users to create accounts and sync their libraries across devices.
- **Offline Mode**: Enable offline access to saved books and notes.

## 🐞 Issues and Challenges Faced

- **Google Books API Integration**: Encountered challenges with the API, particularly switching from OpenLibrary API when it was unavailable.
- **LocalStorage Management**: Managing and persisting user data through localStorage required careful handling to avoid duplication and ensure data integrity.
- **Custom Book Covers**: Implemented fallback logic to handle books without available images.

## 🧠 Key Learnings

- **Working with External APIs**: Gained experience integrating with the Google Books API and handling various API limitations.
- **React State Management**: Improved knowledge of managing global state with `useContext` and `useState`.
- **LocalStorage**: Mastered the use of localStorage for persisting user data and syncing it with React state.

## 🔗 Resources

- [Google Books API Documentation](https://developers.google.com/books/docs/v1/getting_started)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Icons](https://react-icons.github.io/react-icons/)


---
