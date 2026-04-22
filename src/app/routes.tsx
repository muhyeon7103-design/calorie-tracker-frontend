import { createBrowserRouter, Navigate } from 'react-router';
import Login from './components/Login';
import Signup from './components/Signup';
import Tracker from './components/Tracker';

const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/tracker',
    element: (
      <ProtectedRoute>
        <Tracker />
      </ProtectedRoute>
    ),
  },
]);
