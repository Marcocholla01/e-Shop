import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import logo from "../../../assets/images/svg/logo.svg";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";

import { useReactToPrint } from "react-to-print";
import styles from "../../../styles/style";
import { FiDownloadCloud } from "react-icons/fi";
import { getwithdrawalDetails } from "../../../redux/actions/withdrawals";

const PaymentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const invoiceRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${BASE_URL}/withdraw/withdrawal/${id}`)
      .then((res) => {
        setData(res.data);
        dispatch(getwithdrawalDetails(id));
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const printedAt = new Date(Date.now()).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

    console.log(data);
  const isoDate = data?.withdraw?.createdAt;

  //   const normalDate = new Date(isoDate).toLocaleDateString();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const normalDate = new Date(isoDate).toLocaleDateString(undefined, options);

  const date = data?.withdraw?.createdAt;

  const options1 = { year: "numeric", month: "long", day: "numeric" };
  const normalDate1 = new Date(date).toLocaleDateString(undefined, options1);

  //   const subTotal =
  //     data &&
  //     data?.withdraw?.reduce(
  //       (total, item) => total + item.discountPrice * item.qty,
  //       0
  //     );

  //   console.log(subTotal);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  function getStatusColor(status) {
    if (status === "Suceeded") {
      return "green-600 bg-green-100";
    } else if (status === "Processing") {
      return "blue-600 bg-blue-100";
    } else {
      return null;
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
            Download or Print Transaction{" "}
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
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-[500] text-3xl text-center  text-slate-700 font-Poppins italic uppercase">
              Withdrawal Information
            </h1>
            <div className="flex  gap-4 mt-2 mb-2">
              <p>Withdrawal ID #</p>
              <p>{data?.withdraw?._id}</p>
            </div>
            <p className="text-center text-sm font-semibold mt-2">
              STATUS
              <span
                className={`text-${getStatusColor(
                  data?.withdraw?.status
                )} p-1 rounded mt-3 ml-2`}
              >
                {data?.withdraw?.status}
              </span>
            </p>
          </div>
          <div className="flex justify-between border-b border-gray-500 pb-8">
            <div className="flex flex-col">
              <h2>Paid From:</h2>
              <p>ShopO Multi-vendor System</p>
              <p>4517 Moi Avenue, Sports House R453</p>
              <p>Nairobi, Kenya</p>
              <p>shop0.system@gmail.com</p>

              {data?.withdraw?.status === `Processing` ? (
                <div className="flex justify-start gap-4">
                  <p className="text-red-700 bg-red-300 p-2 text-sm font-semibold rounded-md">
                    Not Yet Paid
                  </p>
                </div>
              ) : (
                <div className="flex justify-start gap-4 text-green-700 p-1 text-sm font-semibold rounded-md w-auto">
                  <p>Paid on</p>
                  <span>{normalDate} </span>
                </div>
              )}
            </div>
            <img src={logo} alt="limifood logo" className="w-36 h-16" />
          </div>
          {/* Header End */}
          <div className="flex justify-between border-b border-gray-500 py-8">
            <div className="flex flex-col">
              <h2>Sent To:</h2>
              <p>{data?.withdraw?.seller?.name} </p>
              <p>
                {data?.withdraw?.seller?.addresses[0]?.address1}{" "}
                {/* {data?.withdraw?.user?.addresses[0]?.address2}{" "} */}
              </p>
              <p>{data?.withdraw?.user?.addresses[0]?.country}</p>
              <p>{data?.withdraw?.seller?.email} </p>
            </div>
            {data?.withdraw?.status === `Processing` ? (
              <div className="flex justify-center gap-4">
                <p className="text-red-700 bg-red-300 p-2 text-center text-sm font-semibold rounded-md">
                  Not Yet Paid
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex justify-between gap-3">
                  <p>Reciever Name</p>
                  <p>
                    {data?.withdraw?.seller?.withdrawMethod?.bankHolderName}
                  </p>
                </div>
                <div className="flex justify-between gap-3">
                  <p>Account Number</p>
                  <p>
                    {data?.withdraw?.seller?.withdrawMethod?.bankAccountNumber}
                  </p>
                </div>
                <div className="flex justify-between gap-3">
                  <p>Bank Name</p>
                  <p>{data?.withdraw?.seller?.withdrawMethod?.bankName}</p>
                </div>

                <div className="flex justify-between gap-4 text-blue-700 text-sm font-semibold ">
                  <p>Initiated On</p>
                  <p>{normalDate1} </p>
                </div>
                <div className="flex justify-between text-green-700 text-sm font-semibold ">
                  <p>Paid on</p>
                  <p>{normalDate}</p>
                </div>
              </div>
            )}
          </div>

          <div className="relative overflow-x-auto ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Item Name
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Line Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {" "}
                    <td className="px-6 py-4">Amount </td>{" "}
                  </th>

                  <td className="px-6 py-4">
                    KSH: {data?.withdraw?.amount || (0).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between border-b border-gray-500 py-8">
            <div className="flex flex-col">
              <h2>NOTES</h2>
              <p>This price had already undergone a Tax deduction of 15% </p>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p></p>
                <p></p>
              </div>
              <div className="flex justify-between">
                <p className="mr-5"></p>
                <p> </p>
              </div>
              <div className="flex justify-between mt-5 border-t border-gray-500  gap-3 ">
                <p className="font-semibold text-lg text-slate-600 mt-5">
                  Grand Total
                </p>
                <p className="font-semibold text-lg mt-5">
                  KSH: {data?.withdraw?.amount?.toLocaleString()}
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

export default PaymentDetails;
