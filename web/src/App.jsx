import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import AuthService from './services/auth.service';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ToastContainer from "./ToastContainer";
import NavigationMenu from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Docs from "./pages/Docs";
import Verify from "./pages/Verify";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function PrivateRoute({ children }) {
  const auth = AuthService.getCurrentUser()
  return auth ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <NavigationMenu />
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/tos" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
      <ToastContainer />
      <Footer />
    </div>
  )
}

export default App
