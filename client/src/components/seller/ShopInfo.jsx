import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/style";
import { BASE_URL } from "../../config";
import axios from "axios";

const ShopInfo = ({ isOwner }) => {
  const logoutHandler = () => {
    axios.get(`${BASE_URL}/shop/logout-seller`, { withCredentials: true });
    window.location.reload(true);
  };

  const { isLoading, seller } = useSelector((state) => state.seller);
  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            src={seller.avatar.url}
            alt="Shop Profile Image"
            className={`w-[150px] h-[150px] object-cover rounded-full`}
          />
        </div>
        <h3 className="py-2 text-center text-[20px] font-[600]">
          {seller.name}
        </h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {seller.description}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">{seller.address}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Numbers</h5>
        <h4 className="text-[#000000a6] flex flex-col">
          <h4 className="font-[600]">Main Number: </h4>
          <p>{seller.phoneNumber[0]}</p>
          <h4 className="font-[600]">Other Number:</h4>
          <p>{seller.phoneNumber[1]}</p>
        </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">{seller.total_products || 10}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000a6]">{seller.ratings} 4/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000a6]">{seller.createdAt.slice(0, 10)}</h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <div className={`${styles.button} !w-full !-h[42px] !rounded-[5px]`}>
            <span className="text-white">Edit Shop</span>
          </div>
          <div className={`${styles.button} !w-full !-h[42px] !rounded-[5px]`}>
            <span className="text-white" onClick={logoutHandler}>
              Log Out
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
