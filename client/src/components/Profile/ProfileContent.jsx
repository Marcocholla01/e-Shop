import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
// import { Button } from "@material-ui/core";
// import { DataGrid } from "@material-ui/data-grid";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [zipcode, setZipCode] = useState(user && user.zipcode);
  const [address1, setAddress1] = useState(user && user.address1);
  const [address2, setAddress2] = useState(user && user.address2);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full">
      {/* Profile Page  */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={user?.avatar.url}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full border-[3px] border-[#3ad132]"
              />
              <div className="absolute flex items-center cursor-pointer rounded-full bg-[#e3e9ee] w-[30px] h-[30px] bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5 flex">
            <form
              className="w-full"
              onSubmit={handleSubmit}
              aria-required={true}
            >
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Full Names</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="email"
                    name=""
                    id=""
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex pb-3">
                <div className="w-full flex pb-3">
                  <div className="w-[50%]">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="number"
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%]`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="w-[50%]">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%]`}
                      required
                      value={zipcode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex pb-3">
                <div className="w-full flex pb-3">
                  <div className="w-[50%]">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%]`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-[50%]">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%]`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="border mt-8 cursor-pointer text-center rounded-[3px] w-[250px] h-[40px] border-[#3a24db] text-[#3a24db] uppercase"
              >
                Update
              </button>
            </form>
          </div>
        </>
      )}

      {/* Order page */}
      {active === 2 && <div>orders</div>}
      {/* Order page */}
      {active === 3 && <div>Refands</div>}
      {/* Order page */}
      {active === 4 && <div>{/* <AllOrders /> */}</div>}
      {/* Order page */}
      {active === 5 && <div>track order</div>}
      {/* Payment methods */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}
      {/* Order page */}
      {active === 7 && <div>Address</div>}
      {/* Order page */}
      {active === 8 && <div>Logout</div>}
    </div>
  );
};

const AllOrders = () => {
  //   const orders = [
  //     {
  //       _id: "745gcgdje7464535",
  //       orderItems: [
  //         {
  //           name: "Iphone 14 pro max",
  //         },
  //       ],
  //       totalPrice: 120,
  //       orderStatus: "Processing",
  //     },
  //   ];

  //   const columns = [
  //     { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

  //     {
  //       field: "status",
  //       headerName: "Status",
  //       minWidth: 130,
  //       flex: 0.7,
  //       cellClassName: (params) => {
  //         return params.getValue(params.id, "status") === "Delivered"
  //           ? "greenColor"
  //           : "redColor";
  //       },
  //     },
  //     {
  //       field: "itemsQty",
  //       headerName: "Items Qty",
  //       type: "number",
  //       minWidth: 130,
  //       flex: 0.7,
  //     },

  //     {
  //       field: "total",
  //       headerName: "Total",
  //       type: "number",
  //       minWidth: 130,
  //       flex: 0.8,
  //     },

  //     {
  //       field: " ",
  //       flex: 1,
  //       minWidth: 150,
  //       headerName: "",
  //       type: "number",
  //       sortable: false,
  //       renderCell: (params) => {
  //         return (
  //           <>
  //             {/* <Link to={`/user/order/${params.id}`}>
  //               <Button>
  //                 <AiOutlineArrowRight size={20} />
  //               </Button>
  //             </Link> */}
  //           </>
  //         );
  //       },
  //     },
  // ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return <div className="pl-8 pt-1"></div>;
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba]">
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-[#fff] h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img src="" alt="Visa Method" />
          <h5 className="pl-5 font-[600]">Marcocholla Paul</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 **** **** ****</h6>
          <h5 className="pl-6">08/2023</h5>
        </div>
        <div className="min-w-[10%] flex justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
export default ProfileContent;
