import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CreateEvent.css';

function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

    const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    eventDate: '',
    eventTime: '',
    eventType: 'GROUP',
    maxTeamSize: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'eventType') {
      if (value === 'SOLO') {
        setFormData({
          ...formData,
          [name]: value,
          maxTeamSize: 1,
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
          maxTeamSize: '',
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Event name is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!formData.eventDate) {
      setError('Event date is required');
      return false;
    }
    if (!formData.eventTime) {
      setError('Event time is required');
      return false;
    }
    if (!formData.maxTeamSize || formData.maxTeamSize < 1) {
      setError('Max team size must be at least 1');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const eventData = {
        name: formData.name,
        description: formData.description,
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        eventType: formData.eventType,
        maxTeamSize: parseInt(formData.maxTeamSize),
      };

      const response = await axios.post(
        `${API_BASE}/event/add-event`,
        eventData
      );

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          description: '',
          eventDate: '',
          eventTime: '',
          eventType: 'GROUP',
          maxTeamSize: '',
        });
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  if (!localStorage.getItem('adminLoggedIn')) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="create-event-container">
      <button className="back-btn" onClick={() => navigate('/admin')}>
        ← Back to Dashboard
      </button>

      <div className="create-event-form-container">
        <div className="form-header">
          <h1>Create New Event</h1>
          <p>Add a new event to the system</p>
        </div>

        {success && (
          <div className="success-message">
            ✓ Event created successfully! Redirecting to dashboard...
          </div>
        )}

        {error && (
          <div className="error-message">
            ✗ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="create-event-form">
          <div className="form-group">
            <label htmlFor="name">Event Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter event name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter event description"
              value={formData.description}
              onChange={handleChange}
              className="form-input textarea"
              rows="4"
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="eventDate">Event Date *</label>
              <input
                id="eventDate"
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventTime">Event Time *</label>
              <input
                id="eventTime"
                type="time"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="eventType">Event Type *</label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              >
                <option value="GROUP">GROUP</option>
                <option value="SOLO">SOLO</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="maxTeamSize">Max Team Size *</label>
              <input
                id="maxTeamSize"
                type="number"
                name="maxTeamSize"
                placeholder="Enter max team size"
                value={formData.maxTeamSize}
                onChange={handleChange}
                className="form-input"
                disabled={formData.eventType === 'SOLO' || loading}
                min="1"
              />
              {formData.eventType === 'SOLO' && (
                <small className="disabled-hint">Auto-set to 1 for SOLO events</small>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating Event...' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
