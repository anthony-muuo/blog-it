import { useEffect } from "react";
import userUser from "../store/userStore";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { user } = userUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default Protected;
