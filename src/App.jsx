import './App.css';
import './index.css';
import { useState } from 'react';
import { BrowserRouter, Router, Route, useNavigate, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';

function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter basename="/React-dashboard/">
      <Routes>
      <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/Dashboard"
          element={
            IsLoggedIn ? <DashboardLayout setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/Login" />
          }
        />
        <Route path="*" element={<Navigate to="/Login" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;