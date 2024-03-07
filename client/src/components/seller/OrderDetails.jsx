import React, { useEffect, useState } from "react";
import styles from "../../styles/style";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, []);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${BASE_URL}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((response) => {
        toast.success(`order updated successfully`);
        navigate(`/dashboard-orders`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to={`/dashboard-orders`}>
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>
      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt.slice(0, 10)} </span>
        </h5>
      </div>
      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <>
            {" "}
            <div className="w-full flex items-start mb-5">
              <img
                src={`${item.images[0].url} `}
                alt=""
                className="w-[80px] h-[80px]"
              />

              <div className="w-full">
                <h5 className="pl-3 text-[20px]">{item.name} </h5>
                <h5 className="pl-3 text-[20px] text-[#00000091]">
                  KSHS: {item.discountPrice} X {item.qty}{" "}
                </h5>
              </div>
            </div>
          </>
        ))}{" "}
      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price <strong>KSHS: {data?.totalPrice} </strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full items-center sm:flex">
        <div className="w-full sm:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Addresses:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              ", " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className="text-[20px]">{data?.shippingAddress.country} </h4>
          <h4 className="text-[20px]">{data?.shippingAddress.city} </h4>
          <h4 className="text-[20px]">{data?.user?.phoneNumber} </h4>
        </div>
        <div className="w-full sm:w-[40%]">
          <h4 className="pt-3 text-[20px] font-[600]">Payment Info:</h4>
          <h4 className="pt-3 text-[20px]">
            Mode:{" "}
            {data?.paymentInfo.method ? data?.paymentInfo?.method : "Not Paid"}{" "}
          </h4>
          <h4 className="pt-3 text-[20px]">
            Status:{" "}
            {data?.paymentInfo.status ? data?.paymentInfo?.status : "Not Paid"}{" "}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className={`w-[300px] mt-2 border h-[35px] rounded-[5px] `}
      >
        {[
          "Processing",
          "Cancelled",
          "Transfered to delivery partner",
          "shipping",
          "Received",
          "On the way",
          "Delivered",
        ]
          .slice(
            [
              "Processing",
              "Cancelled",
              "Transfered to delivery partner",
              "shipping",
              "Received",
              "On the way",
              "Delivered",
            ].indexOf(data?.status)
          )
          .map((option, index) => (
            <option
              value={option}
              key={index}
              disabled={
                (data?.status === "Processing" &&
                  ["shipping", "Received", "On the way", "Delivered"].includes(
                    option
                  )) ||
                (data?.status === "Cancelled" &&
                  [
                    "shipping",
                    "Received",
                    "On the way",
                    "Delivered",
                    "Processing",
                    "Transfered to delivery partner",
                  ].includes(option))
              }
            >
              {option}{" "}
            </option>
          ))}
      </select>
      <div
        className={`${styles.button} mt-5 !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
        onClick={orderUpdateHandler}
      >
        {" "}
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;
