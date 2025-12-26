import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedLayout;
