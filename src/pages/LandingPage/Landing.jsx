import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './Landing.css';

const sentences = [
"The more that you read the more things you will know.",
  "Show me a family of readers, and I will show you the people who move the world.",
  "If you don’t like to read, you haven’t found the right book.”",
  "There is no Frigate like a Book To take us Lands away.”"
];

const LandingPage = () => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const navigate = useNavigate(); // Initialize the navigate hook
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 5000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

//   const handleLoginClick = () => {
//       navigate('/login'); // Navigate to the login page
//     };
  
    const handleRegisterClick = () => {
      navigate('/register'); // Navigate to the register page
    };

  return (
    <div className="landing-page">
      <div className="centered-text">
        <h1>{sentences[currentSentenceIndex]}</h1>
      </div>
      <div className="button-container">
        {/* <button onClick={handleLoginClick} className="submit-btn">Login</button> */}
        <button onClick={handleRegisterClick} className="submit-btn">Register</button>
      </div>
    </div>
  );
};

export default LandingPage;
