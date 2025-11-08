import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '', // For confirmation
  });

  const { name, email, password, password2 } = formData;
  const navigate = useNavigate(); // Initialize navigate

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert('Passwords do not match');
      return;
    }

    try {
      // This is the data we will send to the API
      const userData = {
        name,
        email,
        password,
      };

      // Call the API endpoint we created
      const response = await axios.post('/api/users', userData);

      if (response.data) {
        // Save the returned user data (including the token) to localStorage
        // This is how we "log in" the user
        localStorage.setItem('eximiusUser', JSON.stringify(response.data));

        // Redirect to the dashboard
        navigate('/');
      }
    } catch (error) {
      // Handle errors (e.g., user already exists)
      const message =
        error.response?.data?.message ||
        error.message ||
        'An unknown error occurred';
      console.error('Registration failed:', message);
      alert(`Registration failed: ${message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Register New Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter a password"
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
            placeholder="Confirm your password"
            required
            minLength="6"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
