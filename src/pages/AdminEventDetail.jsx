import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminEventDetail.css';

function AdminEventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTeamId, setExpandedTeamId] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    // Check if admin is logged in
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
      navigate('/admin/login');
      return;
    }

    fetchEventDetail();
  }, [id, navigate]);

  const fetchEventDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/event/get-event-by-id/${id}`);
      if (response.data.success) {
        setEvent(response.data.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch event details');
    } finally {
      setLoading(false);
    }
  };

  const toggleTeamExpand = (teamId) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
  };

  if (loading) {
    return <div className="admin-detail-loading">Loading event details...</div>;
  }

  if (error) {
    return <div className="admin-detail-error">Error: {error}</div>;
  }

  if (!event) {
    return <div className="admin-detail-error">Event not found</div>;
  }

  return (
    <div className="admin-event-detail-container">
      <button className="back-btn" onClick={() => navigate('/admin')}>
        ← Back to Events
      </button>

      <div className="event-header-admin">
        <div className="header-content">
          <h1>{event.name}</h1>
          <span className="event-type-badge">{event.eventType}</span>
        </div>
        <p className="description">{event.description}</p>
      </div>

      <div className="event-details-admin">
        <div className="detail-card">
          <h4>Date</h4>
          <p>{event.eventDate}</p>
        </div>
        <div className="detail-card">
          <h4>Time</h4>
          <p>{event.eventTime}</p>
        </div>
        <div className="detail-card">
          <h4>Max Team Size</h4>
          <p>{event.maxTeamSize} members</p>
        </div>
        <div className="detail-card highlight">
          <h4>Total Teams</h4>
          <p className="big-number">{event.teams ? event.teams.length : 0}</p>
        </div>
      </div>

      <div className="teams-section">
        <h2>Team Registrations</h2>
        {!event.teams || event.teams.length === 0 ? (
          <div className="no-teams">No teams registered yet</div>
        ) : (
          <div className="teams-list">
            {event.teams.map((team) => (
              <div key={team.id} className="team-card">
                <div
                  className="team-header"
                  onClick={() => toggleTeamExpand(team.id)}
                >
                  <div className="team-info">
                    <h3>{team.teamName}</h3>
                    <span className="registration-date">
                      Registered: {new Date(team.registeredAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="team-meta">
                    <span className="member-count">
                      {team.participants ? team.participants.length : 0} members
                    </span>
                    <span className={`expand-icon ${expandedTeamId === team.id ? 'expanded' : ''}`}>
                      ▼
                    </span>
                  </div>
                </div>

                {expandedTeamId === team.id && (
                  <div className="team-participants">
                    <table className="participants-table">
                      <thead>
                        <tr>
                          <th>Full Name</th>
                          <th>Phone</th>
                          <th>Batch</th>
                          <th>Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {team.participants && team.participants.length > 0 ? (
                          team.participants.map((participant, index) => (
                            <tr key={participant.id || index}>
                              <td className="name-cell">{participant.fullname}</td>
                              <td>{participant.phone}</td>
                              <td>{participant.batch}</td>
                              <td>
                                <span className="year-badge">
                                  {participant.currentYear === 1 && '1st Year'}
                                  {participant.currentYear === 2 && '2nd Year'}
                                  {participant.currentYear === 3 && '3rd Year'}
                                  {participant.currentYear === 4 && '4th Year'}
                                  {participant.currentYear === 5 && 'Intern'}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="no-participants">
                              No participants found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminEventDetail;
