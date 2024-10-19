import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
      const auth = JSON.parse(localStorage.getItem('auth')); // Check if user is logged in
      return auth ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
      children: PropTypes.node.isRequired,
};

export default PrivateRoute;
