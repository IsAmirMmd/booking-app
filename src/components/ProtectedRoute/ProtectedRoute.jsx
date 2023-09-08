import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const naviagate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) naviagate("/login"); //AUTHENTICATON
  }, [isAuthenticated, naviagate]);

  return isAuthenticated ? children : null;
}
export default ProtectedRoute;
