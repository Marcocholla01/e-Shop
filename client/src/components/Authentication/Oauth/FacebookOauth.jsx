import React from "react";
import { BsFacebook } from "react-icons/bs";
import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../../firebase";
import { toast } from "react-toastify";

function FacebookOauth() {
  const handleFacebookClick = async () => {
    // Add Auth Logics
    const provider = new FacebookAuthProvider();

    const auth = getAuth(app);

    await signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

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
