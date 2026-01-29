import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import AdminLogin from './pages/AdminLogin';
import AdminEvents from './pages/AdminEvents';
import AdminEventDetail from './pages/AdminEventDetail';
import CreateEvent from './pages/CreateEvent';
import './App.css';

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path="/events" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminEvents />} />
          <Route path="/admin/event/:id" element={<AdminEventDetail />} />
          <Route path="/admin/create-event" element={<CreateEvent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
