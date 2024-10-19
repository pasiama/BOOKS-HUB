// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from './App.jsx'
import { AppProvider } from "./context";
import "./index.css";
import Home from "./pages/Home/Home";
import MyBooks from "./pages/About/MyBooks";
import Registration from "./pages/Registration/RegistrationPage";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import LoginPage from "./pages/Login/LoginPage";
import Landing from "./pages/LandingPage/Landing";
import PrivateRoute from "./PrivateRoute";
// import { GoogleBooksProvider } from './GoogleBooksContext';


function App() {
  return (
    <>
    
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Registration />} />

            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/home/my-books"
              element={
                <PrivateRoute>
                  <MyBooks />
                </PrivateRoute>
              }
            />
            <Route
              path="/book"
              element={
                <PrivateRoute>
                  <BookList />
                </PrivateRoute>
              }
            />
            <Route
              path="/book/:id"
              element={
                <PrivateRoute>
                  <BookDetails />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AppProvider>
      
    </>
  );
}

export default App;
