import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [exceptions, setExceptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function will run once when the component loads
    const fetchExceptions = async () => {
      try {
        setLoading(true);
        // Make the GET request to our API
        const { data } = await api.get('/exceptions');
        setExceptions(data); // Store the data in state
        setError(null);
      } catch (err) {
        console.error('Error fetching exceptions:', err);
        setError('Failed to load exceptions.');
      } finally {
        setLoading(false);
      }
    };

    fetchExceptions();
  }, []); // The empty array [] means this effect runs only once

  return (
    <div>
      <h2>Exception Dashboard</h2>
      {loading && <p>Loading exceptions...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div className="exception-list">
        {/* If we have no exceptions, show a message */}
        {!loading && exceptions.length === 0 && (
          <p>No exceptions found. Go to "New Exception" to create one.</p>
        )}

        {/* Map over the exceptions and display them */}
        {exceptions.map((ex) => (
          <div key={ex._id} className="exception-card">
            <h3>{ex.title}</h3>
            <p>{ex.description}</p>
            <span className={`status status-${ex.status?.toLowerCase()}`}>
              Status: {ex.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

