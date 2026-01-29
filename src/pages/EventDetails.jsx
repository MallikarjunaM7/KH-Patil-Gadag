import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/EventDetails.css';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registering, setRegistering] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  useEffect(() => {
    if (event) {
      // Initialize participants array based on maxTeamSize
      const initialParticipants = Array(event.maxTeamSize).fill(null).map(() => ({
        fullName: '',
        phone: '',
        batch: new Date().getFullYear(),
        currentYear: 1,
      }));
      setParticipants(initialParticipants);
    }
  }, [event]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://kh-patil-gadag-server-production-03b7.up.railway.app/event/get-event-by-id/${id}`);
      if (response.data.success) {
        setEvent(response.data.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch event details');
    } finally {
      setLoading(false);
    }
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: field === 'batch' || field === 'currentYear' ? parseInt(value) : value,
    };
    setParticipants(updatedParticipants);

    // For SOLO events, auto-generate team name from first participant's name
    if (event && event.eventType === 'SOLO' && index === 0 && field === 'fullName' && value.trim()) {
      setTeamName(`${value.trim()}'s Team`);
    }
  };

  const validateForm = () => {
    // For SOLO events, skip team name validation (auto-generated)
    if (event && event.eventType !== 'SOLO') {
      if (!teamName.trim()) {
        alert('Please enter a team name');
        return false;
      }
    }

    for (let i = 0; i < participants.length; i++) {
      const participant = participants[i];
      if (!participant.fullName.trim()) {
        alert(`Participant ${i + 1}: Please enter full name`);
        return false;
      }
      if (!participant.phone.trim()) {
        alert(`Participant ${i + 1}: Please enter phone number`);
        return false;
      }
      if (!/^\d{10}$/.test(participant.phone.replace(/\D/g, ''))) {
        alert(`Participant ${i + 1}: Please enter a valid 10-digit phone number`);
        return false;
      }
      if (!participant.batch || participant.batch < 1900 || participant.batch > new Date().getFullYear()) {
        alert(`Participant ${i + 1}: Please enter a valid batch year`);
        return false;
      }
      if (!participant.currentYear || participant.currentYear < 1 || participant.currentYear > 5) {
        alert(`Participant ${i + 1}: Please enter a valid year (1-5)`);
        return false;
      }
    }
    return true;
  };

  const handleRegister = async () => {
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    try {
      setRegistering(true);
      const registrationData = {
        teamName,
        participants,
      };

      const response = await axios.post(
        `https://kh-patil-gadag-server-production-03b7.up.railway.app/event/${id}/register`,
        registrationData
      );

      if (response.data.success) {
        setSuccess(true);
        // Reset form
        setTeamName('');
        setParticipants([]);
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        // Handle backend validation failures (duplicate team name, phone number, etc.)
        alert(response.data.data || response.data.message || 'Registration failed');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.data || err.response?.data?.message || err.message || 'Registration failed';
      alert(errorMsg);
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading event details...</div>;
  }

  if (!event) {
    return <div className="error">Event not found</div>;
  }

  return (
    <div className="event-details-container">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Events</button>

      <div className="event-header-section">
        <h1>{event.name}</h1>
        <span className="event-type-badge">{event.eventType}</span>
      </div>

      <div className="event-info">
        <p className="description">{event.description}</p>
        <div className="event-meta">
          <div className="meta-item">
            <strong>Date:</strong> {event.eventDate}
          </div>
          <div className="meta-item">
            <strong>Time:</strong> {event.eventTime}
          </div>
          <div className="meta-item">
            <strong>Team Size:</strong> {event.maxTeamSize} members
          </div>
        </div>
      </div>

      {success && (
        <div className="success-message">
          ✓ Registration successful! Redirecting to home...
        </div>
      )}

      {error && (
        <div className="error-message">
          ✗ {error}
        </div>
      )}

      <div className="registration-form">
        <h2>Team Registration</h2>

        <div className="form-group">
          <label htmlFor="teamName">Team Name *</label>
          <input
            id="teamName"
            type="text"
            placeholder={event.eventType === 'SOLO' ? 'Auto-generated from your name' : 'Enter your team name'}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            disabled={event.eventType === 'SOLO'}
            className="form-input"
          />
          {event.eventType === 'SOLO' && (
            <small className="field-hint">Team name will be auto-generated based on your name</small>
          )}
        </div>

        <div className="participants-section">
          <h3>Team Members ({event.maxTeamSize})</h3>
          <p className="subtitle">Enter details for all {event.maxTeamSize} team member(s)</p>

          {participants.map((participant, index) => (
            <div key={index} className="participant-form">
              <div className="participant-number">Member {index + 1}</div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor={`fullName-${index}`}>Full Name *</label>
                  <input
                    id={`fullName-${index}`}
                    type="text"
                    placeholder="Enter full name"
                    value={participant.fullName}
                    onChange={(e) => handleParticipantChange(index, 'fullName', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`phone-${index}`}>Phone Number *</label>
                  <input
                    id={`phone-${index}`}
                    type="tel"
                    placeholder="Enter 10-digit phone number"
                    value={participant.phone}
                    onChange={(e) => handleParticipantChange(index, 'phone', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor={`batch-${index}`}>Batch Year *</label>
                  <input
                    id={`batch-${index}`}
                    type="number"
                    placeholder="e.g., 2023"
                    value={participant.batch}
                    onChange={(e) => handleParticipantChange(index, 'batch', e.target.value)}
                    className="form-input"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`year-${index}`}>Current Year *</label>
                  <select
                    id={`year-${index}`}
                    value={participant.currentYear}
                    onChange={(e) => handleParticipantChange(index, 'currentYear', e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">Interns</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="register-btn"
          onClick={handleRegister}
          disabled={registering}
        >
          {registering ? 'Registering...' : 'Register for Event'}
        </button>
      </div>
    </div>
  );
}

export default EventDetails;
