import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import ChatPage from './pages/Chat';

const isAuthenticated = () => !!localStorage.getItem('token');

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/chat"
        element={isAuthenticated() ? <ChatPage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to={isAuthenticated() ? '/chat' : '/login'} />} />
    </Routes>
  );
}

export default App;