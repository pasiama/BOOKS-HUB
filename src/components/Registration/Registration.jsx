import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Import the hook
import './Registration.css'

const Registration = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required')
  });

  const onSubmit = (values) => {
    // Store the user in localStorage for demo purposes (use backend in production)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(values);
    localStorage.setItem('users', JSON.stringify(users));
    
    console.log('Registration successful:', values);

    // Navigate to the desired page after successful registration
    navigate('/login'); // Redirect to the login page (or another route)
  };

  return (
    <div className="registration-container">
      <div className="form-container">
        <div className="form-section">
          <h2>Register</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
              <div className="form-group">
                <label>Username</label>
                <Field type="text" name="username" className="form-input" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <Field type="email" name="email" className="form-input" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <Field type="password" name="password" className="form-input" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <Field type="password" name="confirmPassword" className="form-input" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
              <button type="submit" className="submit-btn">Register</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Registration;
