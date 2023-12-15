import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "../../components/Authentication/Login/Login";

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
