import React from "react";
import { FcGoogle } from "react-icons/fc";
import { BASE_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../../../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { loadUser } from "../../../redux/actions/user";

function GoogleOauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    let user;

    try {
      const results = await signInWithPopup(auth, provider);
      // console.log(results.user);
      user = results.user;
    } catch (error) {
      toast.error(`Authentication failed`);
      console.log(error.message);
      return;
    }

    // Send request to the server
    const data = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    };

    try {
      const response = axios.post(`${BASE_URL}/user/google`, data, {
        withCredentials: true,
      });
      toast.success(response?.data?.message || `Authentication success`);
      dispatch(loadUser());
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || `Something went wrong`);
    }
  };

  return (
    <FcGoogle
      className=" right-2 top-2 cursor-pointer"
      size={30}
      onClick={handleGoogleClick}
    />
  );
}

export default GoogleOauth;
