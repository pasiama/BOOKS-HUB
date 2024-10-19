import{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Navbar.css"
// import logoImg from "../../assets/header.jpg"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook


const handleNavbar = () => setToggleMenu(prevState => !prevState);
const handleLogout = () => {
  // Clear user data from localStorage
  localStorage.removeItem('auth'); // Assuming 'auth' is the key used to store user info
  navigate('/'); // Redirect to the landing page
};

return (
  <nav className='navbar' id = "navbar">
    <div className='container navbar-content flex'>
      <div className='brand-and-toggler flex flex-sb'>
        <Link to = "/" className='navbar-brand flex'>
          {/* <img src = {logoImg} alt = "site logo" /> */}
          <span className='text-uppercase fw-7 fs-24 ls-1'>bookhub</span>
        </Link>
        <button type = "button" className='navbar-toggler-btn' onClick={handleNavbar}>
          <HiOutlineMenuAlt3 size = {35} style = {{
            color: `${toggleMenu ? "#fff" : "#010101"}`
          }} />
        </button>
      </div>

      <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
        <ul className = "navbar-nav">
          <li className='nav-item'>
            <Link to = "book" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to = "my-books" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>My Books</Link>
          </li>
          <li className='nav-item'>
          <Link onClick={handleLogout} className='nav-link text-uppercase text-white fs-22 fw-6 ls-1' style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Logout </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)
    }
    
    export default NavBar