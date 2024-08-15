import React, { useEffect, useState } from "react";
import styles from "../../styles/style";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, LIPIA_ONLINE_REQUEST_URL } from "../../config";
import { toast } from "react-toastify";
import axios from "axios";
import { clearCart } from "../../redux/actions/cart";
import { clearOrder } from "../../redux/actions/order";

const Payment = () => {
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);

  const disptch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem(`latestOrder`));
    setOrderData(orderData);
  }, []);

  // Order data
  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
    couponDiscount: orderData?.discountPrice,
    shippingCost: orderData?.shipping,
    subTotalPrice: orderData?.subTotalPrice,
  };

  // Function to format the phone number
  const formatPhoneNumber = (phoneNumber) => {
    phoneNumber = String(phoneNumber); // Ensure phoneNumber is a string
    if (phoneNumber.startsWith("0")) {
      return phoneNumber;
    } else if (phoneNumber.startsWith("7")) {
      return "0" + phoneNumber;
    } else if (phoneNumber.startsWith("254")) {
      return "0" + phoneNumber.slice(3);
    } else if (phoneNumber.startsWith("+254")) {
      return "0" + phoneNumber.slice(4);
    } else {
      console.error(`Invalid phone number format: ${phoneNumber}`);
      throw new Error("Invalid phone number format");
    }
  };

  const createOrderPaypal = async (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: `Sunflower`,
            amount: {
              currency_code: `USD`,
              value: Math.ceil(orderData.totalPrice / 130), //dividing by 130 is convert to USD & Math.ceil() round up
            },
          },
        ],
        application_context: {
          shipping_preference: `NO_SHIPPING`,
        },
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprovePaypal = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        payPalPaymentHandler(paymentInfo);
      }
    });
  };

  const payPalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: `succeeded`,
      method: `Paypal`,
    };

    await axios
      .post(`${BASE_URL}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate(`/order/success`);
        toast.success(res.data.message);
        disptch(clearCart());
        disptch(clearOrder());
        //  localStorage.setItem(`CartItems`, JSON.stringify([]));
        // localStorage.setItem(`latestOrder`, JSON.stringify([]));
        // window.location.reload(true);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a non-2xx status code
          if (error.response.status === 404) {
            toast.error(error.response.data.message);
          } else if (error.response.status === 401) {
            toast.error(error.response.data.message);
          } else if (error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error(`Server error: ${error.response.data.message}`);
          }
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("Network error. Please check your internet connection.");
        } else {
          // Something happened in setting up the request that triggered an error
          toast.error("Request failed. Please try again later.");
        }
      });
  };

  const stripePaymentHandler = async (e) => {
    e.preventDefault();
    const paymentData = {
      amount: Math.round(orderData.totalPrice * 100),
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/payment/process`,
        paymentData,
        config
      );

      // console.log(data);
      const client_secret = data.client_secret;
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (
          result.paymentIntent &&
          result.paymentIntent.status === "succeeded"
        ) {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            method: `Credit Card`,
          };

          await axios
            .post(`${BASE_URL}/order/create-order`, order, config)
            .then((res) => {
              setOpen(false);
              navigate(`/order/success`);
              toast.success(res.data.message);
              disptch(clearCart());
              disptch(clearOrder());
              //  localStorage.setItem(`CartItems`, JSON.stringify([]));
              // localStorage.setItem(`latestOrder`, JSON.stringify([]));
              // window.location.reload(true);
            })
            .catch((error) => {
              if (error.response) {
                // The request was made and the server responded with a non-2xx status code
                if (error.response.status === 404) {
                  toast.error(error.response.data.message);
                } else if (error.response.status === 401) {
                  toast.error(error.response.data.message);
                } else if (error.response.status === 400) {
                  toast.error(error.response.data.message);
                } else {
                  toast.error(`Server error: ${error.response.data.message}`);
                }
              } else if (error.request) {
                // The request was made but no response was received
                toast.error(
                  "Network error. Please check your internet connection."
                );
              } else {
                // Something happened in setting up the request that triggered an error
                toast.error("Request failed. Please try again later.");
              }
            });
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      method: `Cash On Delivery`,
    };

    await axios
      .post(`${BASE_URL}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate(`/order/success`);
        toast.success(res.data.message);
        disptch(clearCart());
        disptch(clearOrder());
        //  localStorage.setItem(`CartItems`, JSON.stringify([]));
        // localStorage.setItem(`latestOrder`, JSON.stringify([]));
        // window.location.reload(true);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a non-2xx status code
          if (error.response.status === 404) {
            toast.error(error.response.data.message);
          } else if (error.response.status === 401) {
            toast.error(error.response.data.message);
          } else if (error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error(`Server error: ${error.response.data.message}`);
          }
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("Network error. Please check your internet connection.");
        } else {
          // Something happened in setting up the request that triggered an error
          toast.error("Request failed. Please try again later.");
        }
      });
  };

  const lipaNaMpesaPaymentHandler = async (e) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_LIPIA_ONLINE_API_KEY;
    const config = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    };

    let responseData;
    let phoneNumber = user.phoneNumber;

    // Convert phone number
    phoneNumber = formatPhoneNumber(phoneNumber);

    try {
      const data = {
        phone: phoneNumber,
        amount: 1,
        // amount: Math.ceil(order.totalPrice),
      };

      const response = await axios.post(
        `${LIPIA_ONLINE_REQUEST_URL}`,
        data,
        config
      );
      responseData = response.data.data;
      // console.log(responseData);
      toast.info(`Waiting for payment validation...`);
    } catch (error) {
      console.error(error?.response?.data);
      toast.error(error?.response?.data || `Error in processing payments`);
      return;
    }

    order.paymentInfo = {
      status: `succeeded`,
      method: `Mpesa Payment`,
      amount: responseData.amount,
      transactionId: responseData.refference,
      phoneNumber: responseData.phone,
      CheckoutRequestID: responseData.CheckoutRequestID,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/order/create-order`,
        order,
        { withCredentials: true }
      );

      setOpen(false);
      navigate(`/order/success`);
      toast.success(response.data.message);
      disptch(clearCart());
      disptch(clearOrder());
      //  localStorage.setItem(`CartItems`, JSON.stringify([]));
      // localStorage.setItem("latestOrder", JSON.stringify([]));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] sm:w-[70%] block sm:flex">
        <div className="w-full sm:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprovePaypal={onApprovePaypal}
            createOrderPaypal={createOrderPaypal}
            stripePaymentHandler={stripePaymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
            lipaNaMpesaPaymentHandler={lipaNaMpesaPaymentHandler}
          />
        </div>
        <div className="w-full sm:w-[35%] sm:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprovePaypal,
  createOrderPaypal,
  stripePaymentHandler,
  cashOnDeliveryHandler,
  lipaNaMpesaPaymentHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full sm:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="w-full flex border-b">
            <form className="w-full " onSubmit={stripePaymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name On Card</label>
                  <input
                    required
                    placeholder={user && user.name}
                    className={`${styles.input} !w-[95%] text-[#444]`}
                    // value={user && user.name}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <CardExpiryElement
                    className={`${styles.input}`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className={`${styles.input} !h-[35px] !w-[95%]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">CVV / CVC</label>
                  <CardCvcElement
                    className={`${styles.input} !h-[35px]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>

      <br />
      {/* paypal payment */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Paypal
          </h4>
        </div>

        {/* pay with payement */}
        {select === 2 ? (
          <div className="w-full flex border-b">
            <div
              className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-[100%] sm:w-[40%] h-screen sm:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <PayPalScriptProvider
                    options={{
                      "client-id": import.meta.env.VITE_PAY_PAL_CLIENT_ID,
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprovePaypal={onApprovePaypal}
                      createOrderPaypal={createOrderPaypal}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <br />
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <div className="w-full flex" onSubmit={cashOnDeliveryHandler}>
            <form className="w-full ">
              <input
                type="submit"
                value="Confirm"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>

      <br />
      {/* pay with mpesa */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(4)}
          >
            {select === 4 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with mpesa
          </h4>
        </div>

        {/* pay with mpesa */}
        {select === 4 ? (
          <form className="w-full flex" onSubmit={lipaNaMpesaPaymentHandler}>
            <div className="w-full">
              <input
                type="text"
                value={user.phoneNumber}
{/*                 readOnly */}
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="submit"
                value="Confirm"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);

  // console.log(orderData);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">
          Kshs: {orderData?.subTotalPrice}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">Kshs: {shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {orderData?.discountPrice ? `kshs: ` + orderData.discountPrice : `-`}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        Kshs: {orderData.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
