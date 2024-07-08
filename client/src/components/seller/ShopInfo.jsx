import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/style";
import { BASE_URL, backend_url } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});

  const { isLoading, seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);

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

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  const averageRating = (totalRatings / totalReviewsLength).toFixed(2) || 0;

  // console.log(averageRating);
  return (
    <>
      <div>
        <div className="w-full py-5">
          <div className="w-full flex items-center justify-center">
            <img
              src={`${data?.avatar?.url}`}
              alt="Shop Profile Image"
              className={`w-[150px] h-[150px] object-cover rounded-full`}
            />
          </div>
          <h5 className="py-2 text-center text-[20px] font-[600]">
            {data?.name}
          </h5>
          <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
            {data?.description}
          </p>
        </div>
        <div className="p-3">
          <h4 className="font-[600]">Address</h4>
          <h5 className="text-[#000000a6]">{data?.address}</h5>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Phone Numbers</h5>
          <div className="text-[#000000a6] flex flex-col">
            <h5 className="font-[600]">Main Number: </h5>
            <p>{data?.phoneNumber?.[0]}</p>
            <h5 className="font-[600]">Other Number:</h5>
            <p>{data?.phoneNumber?.[1]}</p>
          </div>
        </div>
        <div className="p-3">
          <h4 className="font-[600]">Total Products</h4>
          <h5 className="text-[#000000a6]">{products && products.length} </h5>
        </div>
        <div className="p-3">
          <h4 className="font-[600]">Shop Ratings</h4>
          <h5 className="text-[#000000a6]">{averageRating}/5</h5>
        </div>
        <div className="p-3">
          <h4 className="font-[600]">Joined On</h4>
          <h5 className="text-[#000000a6]">{data?.createdAt?.slice(0, 10)}</h5>
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
            <Link to={`/dashboard-settings/${id}`}>
              <div
                className={`${styles.button} !w-full !-h[42px] !rounded-[5px]`}
              >
                <span className="text-white">Edit Shop</span>
              </div>
            </Link>

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
