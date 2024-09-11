import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../pages/Loading";

export default function AuthNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const publicRoutes = ["/signup", "/login"];

    if (
      !loading &&
      isAuthenticated &&
      !publicRoutes.includes(location.pathname)
    ) {
      navigate("/products");
    } else if (
      !loading &&
      !isAuthenticated &&
      !publicRoutes.includes(location.pathname)
    ) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate, location.pathname]);

  if (loading) {
    return <Loading />;
  }

  return null;
}
