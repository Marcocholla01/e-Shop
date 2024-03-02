import React from "react";
import styles from "../../../styles/style";
import CountDown from "./CountDown";
import iphone from "../../../static/images/iphone.jpg";
import { backend_url } from "../../../config";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addTocartHandler = (data) => {
    const isItemExist = cart && cart.find((i) => i._id === data._id);
    if (isItemExist) {
      toast.error(`Item already exists`);
    } else {
      if (data.stock < 1) {
        toast.error(`Product Stock limited`);
        return;
      }
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success(`Item added to cart successfully`);
    }
  };

  // console.log(data);
  // console.log(cart)
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50] m-auto">
        <img src={`${backend_url}/uploads/${data?.images[0]}`} alt="" />
      </div>
      <div className="w-full lg:[w-50] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p>{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="pr-3 font-bold text-[18px] text-[#333] font-Roboto ">
              {" "}
              999 KSH
            </h5>
            <h5 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
              1099 KSHS
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <br />
        <div className="flex items-center gap-5">
          <Link to={`/event/${data._id}`}>
            <div className={`${styles.button} text-white`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-white`}
            onClick={() => addTocartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
