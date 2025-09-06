import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./stores/useAuthStore";
import Navbar from "./components/Navbar";

export default function App() {
  const { user } = useAuthStore();

  return (
    <>
      <Navbar/>
      <main className='bg-[#F5F6F7] min-h-screen'>
        <Routes>
          
          <Route path="/" element={<HomePage />} />

         
          <Route path="/login" element={user ? <Navigate to="/" /> : <AuthPage />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <AuthPage />} />

          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}