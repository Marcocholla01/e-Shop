import React from "react";
import { FcGoogle } from "react-icons/fc";
import { BASE_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../../../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

function GoogleOauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);

    await fetch(`${BASE_URL}/user/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: result.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      }),
    })
      .then((res) => {
        if (res.data.success === true) {
          navigate("/");
          toast.success(res.data.message);
          window.location.reload(true);
        }
      })
      .catch((error) => {
        console.log("could not sign in with Google", error);
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
