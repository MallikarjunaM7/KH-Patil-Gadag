import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem('adminLoggedIn') === 'true'
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsAdminLoggedIn(localStorage.getItem('adminLoggedIn') === 'true');
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdminLoggedIn(localStorage.getItem('adminLoggedIn') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Close mobile menu when screen is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAdminClick = () => {
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsAdminLoggedIn(false);
    navigate('/events');
    setIsMobileMenuOpen(false);
  };

  const handleCreateEvent = () => {
    navigate('/admin/create-event');
    setIsMobileMenuOpen(false);
  };

  const handleBrandClick = () => {
    if (!isAdminLoggedIn) {
      navigate('/');
    }
  };

  const handleHomeClick = () => {
    navigate('/events');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div 
          className="navbar-brand" 
          onClick={handleBrandClick} 
          style={{ cursor: isAdminLoggedIn ? 'default' : 'pointer' }}
        >
          <h1 className="brand-title">KH Patil Medical College</h1>
          <span className="brand-subtitle">Event Management</span>
        </div>

        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navbar Links */}
        <div className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {!isAdminLoggedIn && location.pathname !== '/events' && (
            <button className="nav-btn home-btn" onClick={handleHomeClick}>
              ← Home
            </button>
          )}

          {!isAdminLoggedIn && (
            <button className="nav-btn admin-btn" onClick={handleAdminClick}>
              🔐 Admin
            </button>
          )}

          {isAdminLoggedIn && (
            <>
              <button className="nav-btn create-event-btn" onClick={handleCreateEvent}>
                ➕ Create Event
              </button>
              <button className="nav-btn logout-btn" onClick={handleLogout}>
                🔓 Logout
              </button>
            </>
          )}
        </div>

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div 
            className="menu-overlay" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
