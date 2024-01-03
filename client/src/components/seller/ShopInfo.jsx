import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/style";
import { BASE_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});

  const { isLoading, seller } = useSelector((state) => state.seller);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    axios
      .get(`${BASE_URL}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const logoutHandler = () => {
    axios.get(`${BASE_URL}/shop/logout-seller`, { withCredentials: true });
    toast.success("You have successfully logout");
    window.location.reload(true);
  };

  // console.log(data);
  return (
    <>
      <div>
        <div className="w-full py-5">
          <div className="w-full flex items-center justify-center">
            <img
              src={data?.avatar?.url}
              alt="Shop Profile Image"
              className={`w-[150px] h-[150px] object-cover rounded-full`}
            />
          </div>
          <h3 className="py-2 text-center text-[20px] font-[600]">
            {data?.name}
          </h3>
          <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
            {data?.description}
          </p>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Address</h5>
          <h4 className="text-[#000000a6]">{data?.address}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Phone Numbers</h5>
          <h4 className="text-[#000000a6] flex flex-col">
            <h4 className="font-[600]">Main Number: </h4>
            <p>{data?.phoneNumber?.[0]}</p>
            <h4 className="font-[600]">Other Number:</h4>
            <p>{data?.phoneNumber?.[1]}</p>
          </h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Total Products</h5>
          <h4 className="text-[#000000a6]">{data?.total_products || 10}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Shop Ratings</h5>
          <h4 className="text-[#000000a6]">{data?.ratings || 4}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Joined On</h5>
          <h4 className="text-[#000000a6]">{data?.createdAt?.slice(0, 10)}</h4>
        </div>
        <div className="px-4">
          <Link
            to={`/`}
            className={`${styles.button} !w-full !-h[42px] !rounded-[5px]`}
          >
            <span className="text-white">View Store</span>
          </Link>
        </div>

        {isOwner && (
          <div className=" px-4">
            <div
              className={`${styles.button} !w-full !-h[42px] !rounded-[5px]`}
            >
              <span className="text-white">Edit Shop</span>
            </div>
            <div
              className={`${styles.button} !w-full !-h[42px] !rounded-[5px]`}
            >
              <span className="text-white" onClick={logoutHandler}>
                Log Out
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopInfo;
