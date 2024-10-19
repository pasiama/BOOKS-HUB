import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const clientId = "143320324811-5160kedjeas2l33vous3gk39bbslpcbl.apps.googleusercontent.com";
const apiKey = "AIzaSyAx4espej2iP9eK6qTfQGzOyDN4iXvww30";
const scopes = "https://www.googleapis.com/auth/books";

const GoogleBooksAuth = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: apiKey,
        clientId: clientId,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/books/v1/rest"],
        scope: scopes,
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const signIn = () => {
    gapi.auth2.getAuthInstance().signIn().then(user => {
      console.log('User signed in', user);
      navigate('/home');
    });
  };

  return (
    <div>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  );
};

export default GoogleBooksAuth;
