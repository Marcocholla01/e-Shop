import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import styles from "../../../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
// import EmptyCart from "../../../assets/images/emptyCart.png";
import EmptyCart from "../../../assets/images/empty-cart.jpg";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // console.log(cart);

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
    toast.info(`Product removed form cart items`);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };
  return (
    <div className="fixed top-0 w-full left-0 h-90vh sm:mt-0 mt-[90px] z-50 bg-[#0000004b]">
      <div className="fixed top-0 right-0 min-h-full  w-[100%] sm:w-[25%] shadow-sm bg-white flex flex-col justify-between">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div
              className={`flex w-full justify-end fixed pt-5 pr-5 top-3 right-3`}
            >
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <div className="text-center items-center  justify-center">
              <img
                src={EmptyCart}
                alt=""
                className="w-full h-min p-2 mb-2 object-cover"
              />
              <h5 className="font-semibold">Your cart is empty</h5>
            </div>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Items length */}
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 font-[500] text-[20px]">
                  {cart && cart.length} items
                </h5>
              </div>
              {/* cart single items */}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}

        <div className="px-5 mb-3">
          {/* Check Out Button */}
          <Link to={`/checkout`}>
            <div className="h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]">
              <h1 className="text-[#fff] text-[15px] font-[600]">
                Checkout Now (KSHS {totalPrice})
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error(`Product Stock limited`);
    } else {
      setValue(value + 1);
      const updatecartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updatecartData);
    }
  };
  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updatecartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updatecartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full h-[25px] flex items-center justify-center  cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={data?.images[0]?.url}
          alt=""
          className="w-[100px] h-min mr-2 rounded-[5px] object-cover ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            KSHS {data.discountPrice}*{value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            KSHS {totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer w-[20%]"
          onClick={() => removeFromCartHandler(data)}
          size={25}
        />
      </div>
    </div>
  );
};

export default Cart;
