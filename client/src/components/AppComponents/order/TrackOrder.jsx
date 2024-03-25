import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../../redux/actions/order";
import Shipping from "../../../assets/images/Take Away-amico.png";

const TrackOrder = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const data = orders && orders.find((item) => item._id === id);
  //   console.log(data);
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <>
        {data && data.status === `Processing` ? (
          <h1 className="text-[30px] font-[500]">
            {" "}
            Your Order is in processing stage at the Shop{" "}
          </h1>
        ) : data && data.status === `Transfered to delivery partner` ? (
          <h1 className="text-[30px] font-[500]">
            {" "}
            Your Order is on the way for delivery partner{" "}
          </h1>
        ) : data && data.status === `shipping` ? (
          <div className="text-center items-center  justify-center">
            <img
              src={Shipping}
              alt=""
              className="w-full h-min p-2 mb-2 object-cover"
            />
            <h5 className="font-semibold text-[30px]">
              Your Order is comming with our delivery partner{" "}
            </h5>
          </div>
        ) : data && data.status === `Recieved` ? (
          <h1 className="text-[30px] font-[500]">
            {" "}
            Your Order is in your city. Our delivery man will deliver it soon{" "}
          </h1>
        ) : data && data.status === `On the way` ? (
          <h1 className="text-[30px] font-[500]">
            {" "}
            Our devilery man is going to deliver your order{" "}
          </h1>
        ) : data && data.status === `Delivered` ? (
          <h1 className="text-[30px] font-[500]">
            {" "}
            Your Order is delivered!!{" "}
          </h1>
        ) : data && data.status === `Cancelled` ? (
          <h1 className="text-[30px] font-[500]">
            {" "}
            Your Order was cancelled!{" "}
          </h1>
        ) : data && data.status === `Processing refund` ? (
          <h1 className="text-[30px] font-[500]">
            {" "}
            Your Order refund is processing!{" "}
          </h1>
        ) : data && data.status === `Refund Success` ? (
          <h1 className="text-[30px] font-[500]">
            {" "}
            Your Order refund is successfully!{" "}
          </h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;
