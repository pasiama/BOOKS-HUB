
import Header from '../../components/Header/Header';
// import HomepageContent from '../../components/HomepageContent/HomepageContent';
// import { useGoogleBooks } from '../../GoogleBooksContext';
// import BooksInShelf from '../../components/BooksInShelf/BooksInShelf';
// import Clients from '../../components/Clients/Clients';
import { Outlet } from 'react-router-dom';
const Home = () => {
  // const context = useGoogleBooks();
  // console.log("context",context); 

  return (
    <main>
     <Header />
     {/* <h1>Your Bookshelves</h1> */}
      {/* <BooksInShelf/> */}
     <Outlet>
     </Outlet>
    </main>
  );
}

export default Home;