import React, { useEffect } from "react";
import Login from "../../components/Login/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate(`/`);
    }
  }, []);

  return (
    <div>
      <Login />
    </div>
  );
}

export default LoginPage;
