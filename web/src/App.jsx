import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import AuthService from './services/auth.service';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ToastContainer from "./ToastContainer";

function PrivateRoute({ children }) {
  const auth = AuthService.getCurrentUser()
  return auth ? children : <Navigate to="/login" />;
}

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<PrivateRoute><h1>hellooo</h1></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
