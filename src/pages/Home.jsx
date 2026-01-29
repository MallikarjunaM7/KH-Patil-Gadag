import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/event/get-all-events');
      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home-container">
      <header className="header">
        <h1>Event Management System</h1>
        <p>Explore and register for events</p>
      </header>

      <div className="events-grid">
        {events.length === 0 ? (
          <div className="no-events">No events available at the moment.</div>
        ) : (
          events.map((event) => (
            <Link to={`/event/${event.id}`} key={event.id} className="event-card-link">
              <div className="event-card">
                <div className="event-header">
                  <h2>{event.name}</h2>
                  <span className="event-type">{event.eventType}</span>
                </div>
                <p className="event-description">{event.description}</p>
                <div className="event-details">
                  <div className="detail-item">
                    <span className="label">Date:</span>
                    <span className="value">{event.eventDate}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Time:</span>
                    <span className="value">{event.eventTime}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Max Team Size:</span>
                    <span className="value">{event.maxTeamSize} members</span>
                  </div>
                </div>
                <button className="view-btn">View & Register →</button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
