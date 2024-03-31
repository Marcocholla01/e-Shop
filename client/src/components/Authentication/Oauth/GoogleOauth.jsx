import React from "react";
import { FcGoogle } from "react-icons/fc";
import { BASE_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../../../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {toast} from "react-toastify"

function GoogleOauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
  
    const result = await signInWithPopup(auth, provider);
  
    // Send request to the server
 await fetch(`${BASE_URL}/user/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      }),
    }).then((res) => {
      if (res.data.success === true) {
        navigate("/");
        toast.success(res.data.message);
        window.location.reload(true);
      } else {
        toast.error(res.data.message);
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a non-2xx status code
        if (error.response.status === 404) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 401) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error(`Server error: ${error.response.data.message}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("Network error. Please check your internet connection.");
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error("Request failed. Please try again later.");
      }
    });
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
