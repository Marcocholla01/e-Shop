import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Signup from "../../components/Authentication/Signup/Signup";

function SignupPage() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate(`/`);
    }
  }, []);
  return (
    <div>
      <Signup />
    </div>
  );
}

export default SignupPage;
