import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/LandingPage.css';
import agneyaImage from '../assets/Agneya Image.jpeg';

function LandingPage() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleEventsClick = () => {
    navigate('/events');
    setIsMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    navigate('/admin/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="landing-page">
      {/* Landing Navbar */}
      <nav className="landing-navbar">
        <div className="landing-navbar-container">
          <div className="landing-brand">
            <h1 className="landing-brand-title">KH Patil Medical College</h1>
            <span className="landing-brand-subtitle">Event Management System</span>
          </div>

          {/* Hamburger Menu Button (reuse navbar classes for consistent behavior) */}
          <button
            className="hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <button className="nav-btn events-btn" onClick={handleEventsClick}>
              📅 Events
            </button>
            <button className="nav-btn admin-btn" onClick={handleAdminClick}>
              🔐 Admin
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">KH Patil Institute of Medical Sciences</h1>
          <p className="hero-subtitle">Malasamudra, Gadag, Karnataka</p>
          <p className="hero-motto">"Sarvejano Arogyam Bhavathu" - Well-being for all</p>
          <img src={agneyaImage} alt="KH Patil Institute" className="hero-image" />
          <button className="hero-cta-btn" onClick={handleEventsClick}>
            Explore Events →
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <div className="about-content">
            <p className="about-text">
              Gadag Institute of Medical Sciences (GIMS), now officially known as <strong>KH Patil Institute of Medical Sciences, Gadag</strong>, is a premier government medical college and tertiary healthcare institution located in Malasamudra, Gadag, Karnataka, India.
            </p>
            <p className="about-text">
              Founded in 2014, the institute has built a strong reputation for <strong>academic excellence, community service, and patient-centric care</strong>. It is affiliated with Rajiv Gandhi University of Health Sciences and recognized by the National Medical Commission.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="vision-mission-section">
        <div className="container">
          <div className="vision-mission-grid">
            <div className="vision-mission-card vision-card">
              <div className="card-icon">🎯</div>
              <h3>Vision</h3>
              <p>To be a beacon of medical excellence fostering ethical practice and holistic healthcare delivery.</p>
            </div>
            <div className="vision-mission-card mission-card">
              <div className="card-icon">🏥</div>
              <h3>Mission</h3>
              <p>"Sarvejano Arogyam Bhavathu" (Well-being for all) - Emphasizing holistic medical education, ethical clinical practice, and equitable healthcare delivery to all sections of society.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs Section */}
      <section className="academic-section">
        <div className="container">
          <h2 className="section-title">Academic Programs & Training</h2>
          
          <div className="programs-grid">
            <div className="program-card ug-card">
              <div className="program-icon">📚</div>
              <h3>Undergraduate Programs</h3>
              <ul>
                <li>MBBS - Bachelor of Medicine and Bachelor of Surgery</li>
                <li>B.Sc Nursing</li>
                <li>B.Sc Allied Health Sciences</li>
                <li>Paramedical Diploma</li>
                <li>GNM Nursing</li>
              </ul>
            </div>

            <div className="program-card pg-card">
              <div className="program-icon">🎓</div>
              <h3>Postgraduate Programs</h3>
              <ul>
                <li>MD Specialty Courses</li>
                <li>MS Specialty Courses</li>
                <li>DNB Programs</li>
                <li>CPS Specialty Courses</li>
                <li>Multiple Clinical & Foundational Disciplines</li>
              </ul>
            </div>

            <div className="program-card clinical-card">
              <div className="program-icon">🏨</div>
              <h3>Advanced Clinical Exposure</h3>
              <ul>
                <li>Government District Teaching Hospital</li>
                <li>Rotated Clinical Centers</li>
                <li>Across Gadag District</li>
                <li>Diverse Patient Cases</li>
                <li>Hands-on Clinical Training</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities-section">
        <div className="container">
          <h2 className="section-title">State-of-the-Art Facilities</h2>
          <div className="facilities-grid">
            <div className="facility-item">
              <span className="facility-icon">🏛️</span>
              <h4>Modern Classrooms</h4>
              <p>Well-equipped learning spaces with latest technology</p>
            </div>
            <div className="facility-item">
              <span className="facility-icon">🔬</span>
              <h4>Advanced Labs</h4>
              <p>Well-equipped laboratories and simulation-based training</p>
            </div>
            <div className="facility-item">
              <span className="facility-icon">📖</span>
              <h4>Central Library</h4>
              <p>Digital learning resources and research facilities</p>
            </div>
            <div className="facility-item">
              <span className="facility-icon">🏠</span>
              <h4>Hostels</h4>
              <p>Residential facilities for students</p>
            </div>
            <div className="facility-item">
              <span className="facility-icon">⚽</span>
              <h4>Sports Complex</h4>
              <p>Sports and recreational facilities for holistic growth</p>
            </div>
            <div className="facility-item">
              <span className="facility-icon">🍽️</span>
              <h4>Cafeteria</h4>
              <p>Student support services and dining facilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare & Community Section */}
      <section className="community-section">
        <div className="container">
          <h2 className="section-title">Healthcare Services & Community Outreach</h2>
          <div className="community-content">
            <div className="community-card">
              <div className="community-icon">🏥</div>
              <h3>Teaching Hospital</h3>
              <p>Serves as a major healthcare hub for Gadag and nearby regions, providing comprehensive medical care under government schemes such as Ayushman Bharat Arogya Karnataka (ABArK) and SCP-TSP.</p>
            </div>
            <div className="community-card">
              <div className="community-icon">🤝</div>
              <h3>Community Engagement</h3>
              <p>Strengthened through health camps, awareness drives, and rural family adoption programs where students monitor and support community health throughout their MBBS.</p>
            </div>
            <div className="community-card">
              <div className="community-icon">💡</div>
              <h3>Research & Innovation</h3>
              <p>Regular seminars, workshops, conferences, and Continuing Medical Education (CME) programs. Faculty and students actively contribute to research addressing contemporary medical challenges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Explore Events?</h2>
          <p>Join us for exciting events and activities at KH Patil Institute of Medical Sciences</p>
          <button className="cta-button" onClick={handleEventsClick}>
            View All Events 📅
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <p>&copy; 2024 KH Patil Institute of Medical Sciences, Gadag. All rights reserved.</p>
          <p>Malasamudra, Gadag, Karnataka, India</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
