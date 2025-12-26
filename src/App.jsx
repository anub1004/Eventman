/*import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProtectedLayout from "./components/Layout/PrivateRoute";

const Dashboard = () => <h1 className="p-10">Dashboard</h1>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;*/
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedLayout from "./components/Layout/PrivateRoute";

import LandingPage from "./components/LandingPage/Landingpage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateEvent from "./components/Events/CreateEvent";
import EventDetails from "./components/Events/EventDetails";
import EditEvent from "./components/Events/EditEvent";

// ✅ Simple redirect if user is already logged in
const RedirectIfLoggedIn = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (user) return <Navigate to="/dashboard" replace />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* PUBLIC */}
          <Route
            path="/"
            element={
              <LandingPage />
            }
          />

          <Route
            path="/login"
            element={
              <RedirectIfLoggedIn>
                <Login />
              </RedirectIfLoggedIn>
            }
          />

          <Route
            path="/signup"
            element={
              <RedirectIfLoggedIn>
                <Signup />
              </RedirectIfLoggedIn>
            }
          />

          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events/create" element={<CreateEvent />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/events/:id/edit" element={<EditEvent />} />
          </Route>

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
