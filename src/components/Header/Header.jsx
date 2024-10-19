import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";
const Header = () => {
  return (
    <div className='holder'>
      <header className="header">
        <Navbar />
        <div className="header-content flex flex-context-center text-black">
          <h2 className="text-capitalize">
            Find the books of your choice
          </h2>
          <br />
          <p className="header-text fs-18 fw-3">
          Books are the gateways to new worlds, and BookHub is your personal librarian. A platform where your literary adventures live, waiting to be explored, reviewed, and revisited. With seamless integration into Google Books, you can build your personal library, keep track of what you are currently reading, and organize your thoughts and reflections—all in one place. BookHub turns your book collection into a dynamic experience, offering more than just storage, but a space to grow and explore your love for reading. </p>
          <SearchForm/>
        </div>
      </header>
    </div>
  );
};

export default Header;

