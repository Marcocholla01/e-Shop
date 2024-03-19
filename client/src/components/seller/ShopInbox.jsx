import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { BsArrowRightCircle, BsSendCheck } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import styles from "../../styles/style";
import { HiEmojiHappy, HiOutlineEmojiHappy } from "react-icons/hi";

const ShopInbox = () => {
  const { seller } = useSelector((state) => state.seller);

  const [conversation, setConversation] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/conversation/get-all-conversation-seller/${seller._id}`,
        { withCredentials: true }
      )
      .then((response) => {
        // console.log(response.data.conversation);
        setConversation(response.data.conversation);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [seller]);

  return (
    <div className="w-[90%] bg-white m-7 h-[90vh] overflow-y-scroll rounded">
      {open && open ? (
        <ChatBox setOpen={setOpen} />
      ) : (
        <>
          <h1 className="text-center text-[30px] font-Poppins py-3 font-semibold">
            {" "}
            All Messages
          </h1>
          {/* All Messages List */}
          {conversation &&
            conversation.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                open={open}
                setOpen={setOpen}
              />
            ))}{" "}
        </>
      )}
    </div>
  );
};

const MessageList = ({ data, index, setOpen, open }) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };

  return (
    <>
      <div
        className={`w-full flex p-3 px-3 ${
          active === index ? "bg-[#00000010]" : "bg-transparent"
        } cursor-pointer`}
        onClick={(e) => setActive(index) || handleClick(data._id)}
      >
        <div className="relative">
          <img
            src="http://127.0.0.1:1000/uploads/1-1710727213732-214344348.png"
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="w-[15px] h-[15px] bg-green-500 rounded-full absolute top-1 -right-1" />
        </div>
        <div className="pl-3">
          <h1 className="text-[18px]"> Paul John</h1>
          <p className="text-[16px] text-[#000c]">You: Yooh!! am Good & U??</p>
        </div>
      </div>
    </>
  );
};

const ChatBox = ({ setOpen }) => {
  return (
    <>
      <div className="w-full min-h-full flex flex-col justify-between">
        <div className="w-full flex  p-3 items-center mt-2 justify-between bg-slate-300">
          {/* message header */}
          <div className="w-full flex">
            <img
              src="http://127.0.0.1:1000/uploads/1-1710727213732-214344348.png"
              alt=""
              className="w-[60px] h-[60px] rounded-full"
            />
            <div className="pl-3">
              <h1 className="text-[18px] font-[600]">Paul John</h1>
              <h1>Active Now</h1>
            </div>
          </div>
          <BsArrowRightCircle
            size={30}
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          />
        </div>

        {/* messagees section */}
        {/* seller part */}
        <div className="px-3 py-2  h-[70vh] overflow-y-scroll">
          <div className="flex w-full ">
            <img
              src="http://127.0.0.1:1000/uploads/1-1710727213732-214344348.png"
              alt=""
              className="w-[40px] h-[40px] rounded-full mr-3"
            />
            <div className="w-auto rounded-md p-3  mb-2 bg-green-500 text-white ">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
                minima odio libero magni distinctio odit fugit explicabo,
              </p>
            </div>
          </div>
          <div className="flex w-full ">
            <img
              src="http://127.0.0.1:1000/uploads/1-1710727213732-214344348.png"
              alt=""
              className="w-[40px] h-[40px] rounded-full mr-3"
            />
            <div className="w-auto rounded-md p-3  mb-2 bg-green-500 text-white ">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
                minima odio libero magni distinctio odit fugit explicabo,
              </p>
            </div>
          </div>
          <div className="flex w-full ">
            <img
              src="http://127.0.0.1:1000/uploads/1-1710727213732-214344348.png"
              alt=""
              className="w-[40px] h-[40px] rounded-full mr-3"
            />
            <div className="w-auto rounded-md p-3  mb-2 bg-green-500 text-white ">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
                minima odio libero magni distinctio odit fugit explicabo,
              </p>
            </div>
          </div>

          <div className="flex w-full justify-end ">
           
            <div className="w-auto rounded-md p-3  mb-2 bg-red-500 text-white ">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
                minima odio libero magni distinctio odit fugit explicabo,
              </p>
            </div>
              <img
              src="http://127.0.0.1:1000/uploads/1-1710727213732-214344348.png"
              alt=""
              className="w-[40px] h-[40px] rounded-full ml-3"
            />
          </div>
        </div>

        {/* customer part */}

        {/* Send message form */}
        <form
          aria-required={true}
          className="p-7 relative w-full flex justify-between items-center"
        >
          <div className="w-[] mr-2">
            <GrGallery size={30} className="cursor-pointer" />
          </div>

          <div className="w-[95%]">
            <input
              type="text"
              placeholder="Enter Your message...."
              className={`${styles.input} p-4 rounded-[30px]`}
            />
            {/* <HiOutlineEmojiHappy
              size={30}
              className="absolute top-11 cursor-pointer ml-2"
            /> */}
            <input type="submit" value="send" className="hidden" id="send" />
            <label htmlFor="send">
              <BsSendCheck
                size={30}
                className="absolute right-12 top-11 cursor-pointer"
              />
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShopInbox;
