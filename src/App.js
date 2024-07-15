import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import JobPage from './pages/JobPage';
import JobDetail from './components/JobDetail';
import AllApplications from './pages/AllApplications';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext'
import JobProvider from './context/JobProvider';

const PrivateRoute = ({ element, role }) => {
  const { user } = React.useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }
  return element;
};

const App = () => {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
            <Route path="/add-job" element={<PrivateRoute element={<JobPage />} role="employer" />} />
            <Route path="/job/:id" element={<PrivateRoute element={<JobDetail />} />} />
            <Route path="/edit-job/:id" element={<PrivateRoute element={<JobPage />} role="employer" />} />
            <Route path="/applications" element={<PrivateRoute element={<AllApplications />} role="employer" />} />
          </Routes>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
};

export default App;
