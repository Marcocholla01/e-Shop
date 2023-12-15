import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SellerLogin from "../../components/seller/sellerAuth/Login/SellerLogin";
const SellerLoginPage = () => {
  const { isSeller, seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isSeller:", isSeller);
    console.log("seller:", seller);
    if (isSeller === true && seller && seller._id) {
      navigate(`/shop/${seller._id}`);
    }
  }, [isSeller, seller]);

  return (
    <div>
      <SellerLogin />
    </div>
  );
};

export default SellerLoginPage;
