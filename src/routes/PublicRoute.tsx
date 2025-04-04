import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "@contexts/AuthContext.tsx";
import Loader from "@components/helper/Loader.tsx";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isUserAuthenticated, loading } = useAuthState();
  
  const publicPaths = ["/", "*"];
  if (publicPaths.includes(location.pathname)) return children;


  if (loading) <Loader />

 return isUserAuthenticated ? <Navigate to="/home" replace /> : children;
};

export default PublicRoute;
