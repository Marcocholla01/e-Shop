import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../../styles/style";

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
    </div>
  );
};

export default ProfileContent;
