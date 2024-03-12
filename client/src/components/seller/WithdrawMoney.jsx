import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/style";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../config";
import { AiOutlineDelete } from "react-icons/ai";
import { loadSeller } from "../../redux/actions/user";
import EmptyAdderess from "../../assets/images/Address-bro.png";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  // const { products } = useSelector((state) => state.product);
  const [deliveredOrder, setDeliveredOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [id, setId] = useState(seller && seller._id);
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [bankInfo, setBankInfo] = useState({
    bankName: seller && seller?.withdrawMethod?.bankName,
    bankCountry: seller && seller?.withdrawMethod?.bankCountry,
    bankSwiftCode: seller && seller?.withdrawMethod?.bankSwiftCode,
    bankAccountNumber: seller && seller?.withdrawMethod?.bankAccountNumber,
    bankHolderName: seller && seller?.withdrawMethod?.bankHolderName,
    bankAddress: seller && seller?.withdrawMethod?.bankAddress,
    // paymentType: "",
  });

  // const paymentTypeData = [
  //   {
  //     name: `Default`,
  //   },
  //   {
  //     name: `Primary`,
  //   },
  //   {
  //     name: `Secondary`,
  //   },
  // ];
  // console.log(bankInfo);
  // console.log(bankInfo.bankName);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));

    const orderData =
      orders && orders.filter((item) => item.status === `Delivered`);
    setDeliveredOrder(orderData);
  }, [dispatch]);

  // const totalEarningsWithoutTax =
  //   deliveredOrder &&
  //   deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);

  // const serviceCharge = (totalEarningsWithoutTax * 0.1).toFixed(2);

  // const seller?.availableBalance = (
  //   totalEarningsWithoutTax - serviceCharge
  // ).toLocaleString();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bankInfo.bankName) {
      return toast.error(`Bank Name required!!`);
    }
    if (!bankInfo.bankSwiftCode) {
      return toast.error(`Bank swift code required!!`);
    }
    if (!bankInfo.bankAddress) {
      return toast.error(`Bank Account Address required!!`);
    }
    if (!bankInfo.bankHolderName) {
      return toast.error(`Bank Account Holder's Name required!!`);
    }
    if (!bankInfo.bankAccountNumber) {
      return toast.error(`Bank Account number required!!`);
    }

    const withdrawMethod = {
      bankName: bankInfo.bankName.toUpperCase(),
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankAddress: bankInfo.bankAddress,
      bankHolderName: bankInfo.bankHolderName,
      // paymentType: bankInfo.paymentType,
      createdAt: new Date().toISOString(),
    };

    await axios
      .put(
        `${BASE_URL}/shop/update-payment-methods`,
        { withdrawMethod, id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: null,
          bankAccountNumber: null,
          bankHolderName: "",
          bankAddress: "",
        });
        setId("");
        setPaymentMethod(false);
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDelete = async () => {
    axios
      .delete(`${BASE_URL}/shop/delete-withdraw-methods/${seller?._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(`Withdrwal metods deleted successfully`);
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const error = () => {
    return toast.info(`Balance Less than Kshs: 100`);
  };

  const hadleWithdrawalRequest = async () => {
    if (!withdrawAmount) {
      return toast.error(`Amount can not be empty`);
    }

    if (withdrawAmount > seller?.availableBalance) {
      return toast.info(`Withdrawal request is greater than current balance`);
    }
    if (withdrawAmount < 100) {
      return toast.info(`can not withdraw less than Kshs: 100`);
    }

    const amount = withdrawAmount;
    await axios
      .post(
        `${BASE_URL}/withdraw/create-withdraw-request/${seller._id}`,
        { amount },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        setOpen(false);
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error.response.message);
      });
    // console.log(amount);
  };
  return (
    <div className="w-full h-[80vh] p-5 pb-0 ">
      <div className="w-full bg-white h- rounded flex flex-col items-center justify-center">
        <h5 className="20px pb-4 pt-5">
          Available Balance:{" "}
          <span className="font-[600]">
            KSHS {seller?.availableBalance.toLocaleString()}{" "}
          </span>
        </h5>
        <button
          className={`${styles.button}  !-h[42px] !rounded-[5px] mb-5`}
          onClick={() =>
            seller?.availableBalance < 100 ? error() : setOpen(true)
          }
        >
          <span className="text-white">Withdraw</span>
        </button>
      </div>
      <div className="w-full px-5 mt-5">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[25px] font-[600] text-[#000000ba]">
            Withdrawal Methods
          </h1>
        </div>
        <br />
        <div className="flex w-full items-center justify-between">
          <br />
          {seller && seller.withdrawMethod ? (
            <div
              className={`${styles.button} !rounded-md !w-[250px] p-2`}
              onClick={() => setPaymentMethod(true)}
            >
              <span className="text-[#fff]">Update withdrawal Method</span>
            </div>
          ) : (
            <div
              className={`${styles.button} !rounded-md`}
              onClick={() => setPaymentMethod(true)}
            >
              <span className="text-[#fff]">Add new</span>
            </div>
          )}
        </div>
        <br />
        {seller && seller.withdrawMethod ? (
          <div className="w-full bg-[#fff] h-[70px] rounded-[4px] flex flex-c items-center px-3 shadow justify-between pr-10">
            <div className="flex items-center">
              {/* <img src={Visa} alt="Visa Method" className="h-full w-10" /> */}
              <h5 className="pl-5 font-[700]">
                {" "}
                {seller && seller?.withdrawMethod?.bankName}
              </h5>
            </div>
            <div className="pl-8 flex items-center">
              <h5 className="pl-5 font-[700]">
                {" "}
                {seller && seller?.withdrawMethod?.bankHolderName}
              </h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6>
                {" "}
                {
                  // seller?.withdrawMethod.bankAccountNumber.slice(0, 3) +
                  "*".repeat(
                    seller?.withdrawMethod?.bankAccountNumber?.length - 3
                  ) + seller?.withdrawMethod?.bankAccountNumber?.slice(-3)
                }
              </h6>
              <h5 className="pl-6">
                {seller && seller?.withdrawMethod?.createdAt?.slice(0, 10)}
              </h5>
            </div>
            <div className="min-w-[10%] flex justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete()}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="text-center items-center  justify-center flex flex-col">
              <img
                src={EmptyAdderess}
                alt=""
                className="w-[20%] h-min p-2 mb-2 object-cover"
              />
              <h5 className="font-semibold">
                You do not have any saved payment method
              </h5>
            </div>
          </>
        )}
      </div>

      {paymentMethod && (
        <>
          <div className="w-full fixed top-0 left-0 items-center flex bg-[#0000004e] h-screen z-[9999] justify-center">
            <div
              className={`sm:w-auto w-[95%] bg-white shadow rounded min-h-[70vh] overflow-y-scroll  p-3`}
            >
              <div className="w-full flex justify-end">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setPaymentMethod(false)}
                />
              </div>
              <div className="sm:w-auto w-[95%] p-10">
                <h3 className="text-[22px] font-Poppins text-center font-[600]">
                  Add or Update a Payment Method:
                </h3>
                <form aria-required="true" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      disabled
                      className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2 hidden"
                      placeholder="Enter your bank account name...."
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="bankHolder">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2"
                      placeholder="Enter your bank account name...."
                      value={bankInfo.bankName ? bankInfo.bankName : ""}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                    />
                  </div>
                  <div className="pt-2">
                    <label htmlFor="bankHolder">
                      Bank Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2 mb-2"
                      placeholder="Enter your country...."
                      value={bankInfo.bankCountry}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankCountry: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="pt-2">
                    <label htmlFor="bankHolder">
                      Bank Swift Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2 mb-2"
                      placeholder="Enter your bank's swift code...."
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="pt-2">
                    <label htmlFor="bankHolder">
                      Bank Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2 mb-2"
                      placeholder="Enter your bank Address...."
                      value={bankInfo.bankAddress}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="pt-2">
                    <label htmlFor="bankHolder">
                      Bank Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2 mb-2"
                      placeholder="Enter your bank holder name...."
                      value={bankInfo.bankHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankHolderName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="pt-2">
                    <label htmlFor="bankHolder">
                      Bank Account Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2 mb-2"
                      placeholder="Enter your bank account number...."
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* <div className="pt-2">
                  <label htmlFor="city" className="block pb-2">
                    Address Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name=""
                    id=""
                    value={bankInfo.paymentType}
                    onChange={(e) =>
                      setBankInfo({
                        ...bankInfo,
                        paymentType: e.target.value,
                      })
                    }
                    className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2 cursor-pointer"
                  >
                    <option
                      value=""
                      className="block border pb-2 cursor-pointer items-center"
                    >
                      Choose your payment Type
                    </option>
                    {paymentTypeData &&
                      paymentTypeData.map((item) => (
                        <option
                          className="block pb-2"
                          key={item.name}
                          value={item.name}
                        >
                          {item.name}{" "}
                        </option>
                      ))}
                  </select>
                </div> */}
                  <div className="flex items-center  flex-col">
                    <button
                      type="submit"
                      className="mt-7 group w-[250px] h-[40px]  py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 uppercase"
                    >
                      submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {open && (
        <div className="w-full fixed top-0 left-0 items-center flex bg-[#0000004e] h-screen z-[9999] justify-center">
          <div
            className={`sm:w-[50%] w-[95%] bg-white shadow rounded min-h-[30vh] p-3`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="w-full flex items-center justify-center flex-col">
              <h3 className="text-[22px] font-Poppins text-center  pb-5 font-[600]">
                Withdrawal
              </h3>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter your withdrawal amount..."
                className="appearance-none block w-[200px] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2 mb-2"
              />
              <div className="flex items-center  flex-col">
                <button
                  className="mt-7 group w-[200px] h-[40px]  py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 uppercase"
                  onClick={hadleWithdrawalRequest}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
