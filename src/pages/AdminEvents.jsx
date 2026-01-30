import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminEvents.css';

function AdminEvents() {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Check if admin is logged in
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
      navigate('/admin/login');
      return;
    }

    fetchEvents();
  }, [navigate, location]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/event/get-all-events`);
      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId, eventName, e) => {
    e.stopPropagation();
    
    const confirmed = window.confirm(
      `Are you sure you want to delete "${eventName}"? This action cannot be undone.`
    );
    
    if (!confirmed) return;

    try {
      const response = await axios.delete(`${API_BASE}/event/delete-event-by-id/${eventId}`);
      if (response.data.success) {
        alert('Event deleted successfully');
        fetchEvents();
      } else {
        alert(response.data.data || response.data.message || 'Failed to delete event');
      }
    } catch (err) {
      alert(err.response?.data?.data || err.response?.data?.message || err.message || 'Failed to delete event');
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading events...</div>;
  }

  if (error) {
    return <div className="admin-error">Error: {error}</div>;
  }

  return (
    <div className="admin-events-container">
      <div className="admin-header">
        <h1>Event Management Dashboard</h1>
        <p>Select an event to view team registrations</p>
      </div>

      <div className="events-table-container">
        {events.length === 0 ? (
          <div className="no-events">No events available</div>
        ) : (
          <div className="events-list">
            {events.map((event) => (
              <div
                key={event.id}
                className="event-row"
                onClick={() => navigate(`/admin/event/${event.id}`)}
              >
                <div className="event-cell name-cell">
                  <h3>{event.name}</h3>
                  <span className="event-type">{event.eventType}</span>
                </div>

                <div className="event-cell description-cell">
                  <p>{event.description}</p>
                </div>

                <div className="event-cell details-cell">
                  <div className="detail">
                    <span className="label">Date:</span>
                    <span className="value">{event.eventDate}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Time:</span>
                    <span className="value">{event.eventTime}</span>
                  </div>
                </div>

                <div className="event-cell stats-cell">
                  <div className="stat">
                    <span className="stat-value">{event.teams ? event.teams.length : 0}</span>
                    <span className="stat-label">Teams</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{event.maxTeamSize}</span>
                    <span className="stat-label">Max Size</span>
                  </div>
                </div>

                <div className="event-cell action-cell">
                  <button className="view-details-btn">
                    View Details →
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={(e) => handleDelete(event.id, event.name, e)}
                    title="Delete event"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminEvents;
