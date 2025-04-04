import { Navigate } from "react-router-dom";
import { useAuthState } from "@contexts/AuthContext.tsx";
import Loader from "@components/helper/Loader.tsx";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isUserAuthenticated, loading } = useAuthState();

  if (loading) return <Loader />

  return isUserAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;