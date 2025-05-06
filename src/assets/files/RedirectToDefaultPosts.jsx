import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToDefaultPosts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/posts?categories=66", { replace: true });
  }, [navigate]);

  return null; // Rien à afficher, juste rediriger
};

export default RedirectToDefaultPosts;
