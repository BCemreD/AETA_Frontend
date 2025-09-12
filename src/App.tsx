import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
//import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/Home";
import LoginPage from "./components/user/LoginForm";
import RegisterPage from "./components/user/RegisterForm";
import ProfilePage from "./pages/ProfilePage";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
       { /*<Route path="/favorites" element={<FavoritesPage />} />*/}
        <Route path="/jobs" />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
