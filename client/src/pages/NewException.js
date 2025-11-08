import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const NewException = () => {
  // Setup state for the form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Get the navigate function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form browser submission

    if (!title || !description) {
      alert('Please fill out all fields');
      return;
    }

    try {
      // Send the data to the backend API endpoint
      const { data } = await api.post('/exceptions', {
        title,
        description,
        // Status defaults to 'Pending' in our schema
      });

      console.log('Exception created:', data);
      
      // On success, redirect to the dashboard
      navigate('/');

    } catch (error) {
      console.error('Error creating exception:', error);
      alert('Failed to create exception');
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Exception</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Exception Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Firewall access for new vendor"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Business Justification</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the business need, risk, and duration..."
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit for Approval
        </button>
      </form>
    </div>
  );
};

export default NewException;

