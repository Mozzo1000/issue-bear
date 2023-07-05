import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import AuthService from './services/auth.service';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ToastContainer from "./ToastContainer";
import NavigationMenu from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Docs from "./pages/Docs";
import Verify from "./pages/Verify";

function PrivateRoute({ children }) {
  const auth = AuthService.getCurrentUser()
  return auth ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div>
      <Router>
        <NavigationMenu />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
