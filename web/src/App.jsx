import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import AuthService from './services/auth.service';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ToastContainer from "./ToastContainer";
import NavigationMenu from "./components/Navbar";

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
          <Route index element={<PrivateRoute><h1>hellooo</h1></PrivateRoute>} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
