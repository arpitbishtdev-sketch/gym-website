import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/me", {
        credentials: "include",
      });

      if (!res.ok) {
        setIsAllowed(false);
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (adminOnly && data.role !== "admin") {
        setIsAllowed(false);
      } else {
        setIsAllowed(true);
      }

      setLoading(false);
    } catch {
      setIsAllowed(false);
      setLoading(false);
    }
  };

  if (loading) return null;

  if (!isAllowed) return <Navigate to="/auth/login" />;

  return children;
}
