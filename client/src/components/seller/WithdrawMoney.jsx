import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/style";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  // const { products } = useSelector((state) => state.product);
  const [deliveredOrder, setDeliveredOrder] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));

    const orderData =
      orders && orders.filter((item) => item.status === `Delivered`);
    setDeliveredOrder(orderData);
  }, [dispatch]);

  const totalEarningsWithoutTax =
    deliveredOrder &&
    deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);

  const serviceCharge = totalEarningsWithoutTax * 0.1;

  const availableBalance = (totalEarningsWithoutTax - serviceCharge).toFixed(2);
  return (
    <div className="w-full h-[100vh] p-5 pb-0 ">
      <div className="w-full bg-white h-full rounded flex flex-col items-center justify-center">
        <h5 className="20px pb-4 ">
          Available Balance:{" "}
          <span className="font-[600]">KSHS {availableBalance} </span>
        </h5>
        <button
          className={`${styles.button}  !-h[42px] !rounded-[5px]`}
          onClick={() => setOpen(true)}
        >
          <span className="text-white">Withdraw</span>
        </button>
      </div>
    </div>
  );
};

export default WithdrawMoney;
