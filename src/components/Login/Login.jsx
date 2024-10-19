import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Link to the CSS file
// import GoogleBooksAuth from '../Login/GoogleBooksAuth';

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const onSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (user) {
      localStorage.setItem('auth', JSON.stringify(user));
      console.log('Login successful:', user);
      navigate('/home'); // Redirect to dashboard or any protected route
    } else {
      console.log('Invalid credentials');
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        {/* <div className="image-container">
          <img src='' alt="Login Visual" />
        </div> */}
        <div className="form-section">
          <h2>Login</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
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
              <button type="submit" className="submit-btn">Login</button>
              {/* <GoogleBooksAuth/> */}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
