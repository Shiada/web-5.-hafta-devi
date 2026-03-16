import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import FeedPage from './pages/FeedPage';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Yükleniyor...</div>;
    return user ? children : <Navigate to="/login" />;
};

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<AuthPage />} />
                    <Route 
                        path="/feed" 
                        element={
                            <ProtectedRoute>
                                <FeedPage />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="*" element={<Navigate to="/feed" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
