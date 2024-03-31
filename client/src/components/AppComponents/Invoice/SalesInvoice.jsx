import React, { useEffect, useRef, useState } from "react";
import logo from "../../../assets/images/svg/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllOrdersOfAdmin,
  getOrderDetails,
} from "../../../redux/actions/order";
import { Country, State } from "country-state-city";
import { BASE_URL } from "../../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { FiDownloadCloud } from "react-icons/fi";
import styles from "../../../styles/style";

import { useReactToPrint } from "react-to-print";

const SalesInvoice = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const invoiceRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${BASE_URL}/order/order/${id}`)
      .then((res) => {
        setData(res.data);
        dispatch(getOrderDetails(id));
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  //   console.log(data);
  const isoDate = data?.order?.createdAt;

  //   const normalDate = new Date(isoDate).toLocaleDateString();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const normalDate = new Date(isoDate).toLocaleDateString(undefined, options);

  const printedAt = new Date(Date.now()).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  //   const subTotal =
  //     data &&
  //     data?.order?.reduce(
  //       (total, item) => total + item.discountPrice * item.qty,
  //       0
  //     );

  //   console.log(subTotal);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  function getStatusColor(status) {
    if (status === "Delivered") {
      return "green-600 bg-green-100";
    } else if (status === "Cancelled") {
      return "red-600 bg-red-100";
    } else if (status === "Processing") {
      return "yellow-600 bg-yellow-100";
    } else if (status === "shipping") {
      return "blue-600 bg-blue-100";
    } else if (status === "Refund Processing") {
      return "purple-600 bg-purple-100";
    } else if (status === "Refund Success") {
      return "gray-600 bg-gray-100";
    } else {
      return "gray-600 bg-gray-100";
    }
  }

  return (
    <div className="flex flex-col">
      {/* Download btn */}
      <div>
        <div className="flex items-end justify-end mr-4">
          <div
            className={`${styles.button} !h-[43px] !rounded-[5px] text-white !p-2 w-auto`}
            onClick={handlePrint}
          >
            {" "}
            Download or Print Invoice{" "}
            <span className="ml-2">
              {" "}
              <FiDownloadCloud size={20} />{" "}
            </span>
          </div>
        </div>
      </div>

      {/* Invoice to be downloaded */}
      <div
        ref={invoiceRef}
        className="bg-white m-4 items-center justify-center"
      >
        <div className="max-w-4xl mx-auto border border-gray-500 p-8 rounded-sm mb-8 bg-neutral-200 sm:w--auto">
        <div>{printedAt}</div>
          {/* Header */}
          <div className="flex flex-col justify-center">
            <h1 className="font-[500] text-3xl text-center  text-slate-700 font-Poppins italic">
              INVOICE
            </h1>
            <p className="text-center text-sm font-semibold mt-2">
              STATUS
              <span
                className={`text-${getStatusColor(
                  data?.order?.status
                )} p-1 rounded mt-3 ml-2`}
              >
                {data?.order?.status}
              </span>
            </p>
          </div>
          <div className="flex justify-between border-b border-gray-500 pb-8">
            <div className="flex flex-col">
              <h2>Bill From:</h2>
              <p>ShopO Multi-vendor System</p>
              <p>4517 Moi Avenue, Sports House R453</p>
              <p>Nairobi, Kenya</p>
              <p>shop0.system@gmail.com</p>
            </div>
            <img src={logo} alt="limifood logo" className="w-36 h-16" />
          </div>
          {/* Header End */}
          <div className="flex justify-between border-b border-gray-500 py-8">
            <div className="flex flex-col">
              <h2>Bill To:</h2>
              <p>{data?.order?.user?.name} </p>
              <p>
                {data?.order?.user?.addresses[0]?.address1}{" "}
                {/* {data?.order?.user?.addresses[0]?.address2}{" "} */}
              </p>
              <p>{data?.order?.user?.addresses[0]?.country}</p>
              <p>{data?.order?.user?.email} </p>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p>Invoice #</p>
                <p>{data?.order?.invoiceId}</p>
              </div>
              <div className="flex justify-between gap-3">
                <p>Payment Method</p>
                <p>{data?.order?.paymentInfo?.method}</p>
              </div>
              <div className="flex justify-between gap-4">
                <p>Invoice Date</p>
                <p>{normalDate} </p>
              </div>
              <div className="flex justify-between">
                <p>Amount Due </p>
                <p>KSHS: {data?.order?.totalPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-x-auto ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Item Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Item Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Item Price
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                Unit Cost
              </th> */}
                  <th scope="col" className="px-6 py-3">
                    Line Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data?.order?.cart) &&
                  data.order.cart.map((item, index) => {
                    // console.log(item.name);
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.name.slice(0, 30)}...
                        </th>
                        <td className="px-6 py-4">{item.qty}</td>
                        <td className="px-6 py-4">
                          KSH: {item?.discountPrice?.toLocaleString()}
                        </td>
                        {/* Assuming qty is stored in the item itself */}
                        <td className="px-6 py-4">
                          KSHS:{" "}
                          {(item.qty * item.discountPrice)?.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {" "}
                    <td className="px-6 py-4">Discount </td>{" "}
                  </th>

                  <td className="px-6 py-4"> {}</td>

                  <td className="px-6 py-4"> {}</td>
                  <td className="px-6 py-4">
                    KSH:{" "}
                    {data?.order?.couponDiscount?.toLocaleString() ||
                      (0).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between border-b border-gray-500 py-8">
            <div className="flex flex-col">
              <h2>NOTES</h2>
              <p>30 Days Money back guarantee</p>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p>SubTotal</p>
                <p>KSHS: {data?.order?.subTotalPrice.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="mr-5">Shipping</p>
                <p>KSHS: {data?.order?.shippingCost?.toLocaleString()}</p>
              </div>
              <div className="flex justify-between mt-5 border-t border-gray-500  gap-3 ">
                <p className="font-semibold text-lg text-slate-600 mt-5">
                  Grand Total
                </p>
                <p className="font-semibold text-lg mt-5">
                  KSHS: {data?.order?.totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center pt-5">
            <img src={logo} alt="limifood logo" className="w-36 h-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoice;
