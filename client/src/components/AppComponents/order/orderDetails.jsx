import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/style";
import { getAllOrdersOfUser } from "../../../redux/actions/order";
import { AiOutlineMessage } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const UserOrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  //   let statusColor = "";

  //   // Determine color based on status
  //   switch (data?.status) {
  //     case "processing || Processing":
  //       statusColor = "blue";
  //       break;
  //     case "status2":
  //       statusColor = "cyan";
  //       break;
  //     case "status3":
  //       statusColor = "green";
  //       break;
  //     case "status4":
  //       statusColor = "yellow";
  //       break;
  //     case "status5":
  //       statusColor = "orange";
  //       break;
  //     default:
  //       statusColor = "blue"; // Default color
  //       break;
  //   }

  const data = orders && orders.find((item) => item._id === id);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        {/* <Link to={`/user/${id}`}>
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link> */}
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
            <div className="sm:flex justify-between mb-5 w-full  block">
              <div className="flex gap-3">
                <img
                  src={`${item.images[0].url} `}
                  alt=""
                  className="w-[80px] h-[80px] rounded-[10px]"
                />

                <div className="w-full">
                  <h5 className="pl-3 text-[20px]">{item.name} </h5>
                  <h5 className="pl-3 text-[20px] text-[#00000091]">
                    KSHS: {item.discountPrice} X {item.qty}{" "}
                  </h5>
                </div>
              </div>

              {data?.status == "Delivered" && (
                <div
                  className={`${styles.button} text-[#fff] mt-8`}
                  onClick={() => setOpen(true) || setSelectedItem(item)}
                >
                  Write a review
                </div>
              )}
            </div>
          </>
        ))}

      {/* Review popup

      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#00000084] z-50 flex justify-center items-center">
          <div className={`w-[50%] h-[80vh] bg-white shadow rounded-md p-3`}>
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins text-center ">
              Give a Review
            </h2>
            <br />
            <div className="w-full flex">
              <img
                src={`${selectedItem?.images[0].url}`}
                alt=""
                className="w-[80px] h-[80px] rounded-md"
              />
              <div>
                <div className="pl-3"></div>
              </div>
            </div>
          </div>
        </div>
      )} */}
      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price <strong>KSHS: {data?.totalPrice} </strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full justify-between sm:flex">
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
        <div className="w-full sm:w-[10%]">
          <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
          <h4 className={`pt-3 text-[20px]  `}>{data?.status}</h4>
        </div>
      </div>
      <div
        className={`${styles.button} mt-9 !rounded !h-11`}
        onClick={handleMessageSubmit}
      >
        <span className="text-white flex items-center">
          Send Message <AiOutlineMessage className="ml-2" />
        </span>
      </div>
    </div>
  );
};

export default UserOrderDetails;
