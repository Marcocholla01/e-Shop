import React from "react";
import { BsFacebook } from "react-icons/bs";
import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../../firebase";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser } from "../../../redux/actions/user";

function FacebookOauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFacebookClick = async () => {
    const provider = new FacebookAuthProvider();
    // provider.addScope("email"); // Request the email scope
    const auth = getAuth(app);

    let user;

    try {
      const result = await signInWithPopup(auth, provider);
      user = result.user;
      // console.log(user);
    } catch (error) {
      toast.error("Authentication failed");
      console.log(error.message);
      return;
    }

    // Optional: Send user data to your server
    const data = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    };

    try {
      const response = await axios.post(`${BASE_URL}/user/facebook`, data, {
        withCredentials: true,
      });
      toast.success(response?.data?.message || "Authentication success");
      navigate("/");
      dispatch(loadUser());
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <BsFacebook
      className="right-2 top-2 cursor-pointer"
      color="#039BE5"
      size={30}
      onClick={handleFacebookClick}
    />
  );
}

export default FacebookOauth;
