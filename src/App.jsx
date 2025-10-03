
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; 
import Login from './pages/Login.jsx'; 
import Register from './pages/Register.jsx'; 
import Home from './pages/Home.jsx'; 

import AuthContext from './context/AuthContext.jsx';
import { useContext } from 'react'; 

function RootLayout() {
  const { user } = useContext(AuthContext); 
  const location = useLocation();

  //URL de imagem  
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1518770660439-4636190be605?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const showBackground = !user && (location.pathname === '/' || location.pathname === '/register');

  const layoutStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: showBackground ? `url(${backgroundImageUrl})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    /* Overlay escuro de 85% para garantir contraste na imagem */
    boxShadow: showBackground ? 'inset 0 0 0 2000px rgba(0, 0, 0, 0.85)' : 'none', 
  };

  return (
    <div style={layoutStyle}>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        
        <Route 
          path="/home" 
          element={
            <ProtectedRoute> 
              <Home /> 
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}