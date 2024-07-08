import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL, SOCKETSERVER, backend_url } from "../../config";
import { useNavigate } from "react-router-dom";
import { BsArrowRightCircle, BsSendCheck } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import styles from "../../styles/style";
import { HiEmojiHappy, HiOutlineEmojiHappy } from "react-icons/hi";

import socketIO from "socket.io-client";
import { format } from "timeago.js";

const ENDPOINT = `${SOCKETSERVER}`;
const socketId = socketIO(ENDPOINT, { transports: [`websocket`] });

const ShopInbox = () => {
  const { seller } = useSelector((state) => state.seller);

  const [conversation, setConversation] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);

  useEffect(() => {
    socketId.on(`getMessage`, (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    // Check if arrivalMessage exists and if the current chat includes the sender of the new message
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      // If both conditions are met, update the messages state by appending the arrivalMessage
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      await axios
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
    };
    getConversation();
  }, [seller, messages]);
  // getAllOnline Users

  useEffect(() => {
    if (seller) {
      const userId = seller._id;
      socketId.emit(`addUser`, userId);
      socketId.on(`getUsers`, (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat?.members.find((member) => member !== seller._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);
  // console.log(currentChat);
  // console.log(messages);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!newMessage) {
      return toast.error(`Input your message`);
    }
    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const recieverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    socketId.emit(`sendMessage`, {
      senderId: seller._id,
      recieverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${BASE_URL}/message/create-new-message `, message)
          .then((response) => {
            setMessages([...messages, response.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit(`updateLastMessage`, {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    await axios
      .put(`${BASE_URL}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      })
      .then((response) => {
        console.log(response.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(currentChat);

  return (
    <div className="w-[85%] sm:w-[90%] bg-white m-7 h-[85vh]  rounded">
      {open && open ? (
        <ChatBox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
          userData={userData}
          online={onlineCheck()}
          activeStatus={activeStatus}
        />
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
                setCurentChat={setCurentChat}
                me={seller._id}
                userData={userData}
                setUserData={setUserData}
                online={onlineCheck(item)}
                activeStatus={activeStatus}
                setActiveStatus={setActiveStatus}
              />
            ))}{" "}
        </>
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  open,
  me,
  setCurentChat,
  userData,
  setUserData,
  online,
  setActiveStatus,
}) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  // console.log(online);

  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  useEffect(() => {
    setActiveStatus(online);

    const userId = data.members.find((user) => user != me);

    // console.log(userId)
    const getUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/user-info/${userId}`, {
          withCredentials: true,
        });
        setUserData(res.data.user);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [me, data]);

  // console.log(data);
  // console.log(userData);

  return (
    <>
      <div
        className={`w-full flex p-3 px-3 ${
          active === index ? "bg-[#00000010]" : "bg-transparent"
        } cursor-pointer`}
        onClick={(e) =>
          setActive(index) ||
          handleClick(data._id) ||
          setCurentChat(data) ||
          setActiveStatus(online)
        }
      >
        <div className="relative">
          <img
            src={`${userData?.avatar.url}`}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          {online ? (
            <div className="w-[15px] h-[15px] bg-green-500 rounded-full absolute top-1 -right-1" />
          ) : (
            <div className="w-[15px] h-[15px] bg-slate-500 rounded-full absolute top-1 -right-1" />
          )}
        </div>
        <div className="pl-3">
          <h1 className="text-[18px]">{userData?.name} </h1>
          <p className="text-[16px] text-[#000c]">
            {data?.lastMessageId !== userData?._id
              ? "You: "
              : userData?.name.split(" ")[0] + ": "}
            {data?.lastMessage}
          </p>
        </div>
      </div>
    </>
  );
};

const ChatBox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  online,
  activeStatus,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-[90vh] w-[100%] sm:w-full rounded-lg">
      <div className="w-full flex p-3 items-center justify-between bg-slate-300 sticky top-0 z-">
        {/* message header */}
        <div className="w-full flex">
          <img
            src={`${userData?.avatar.url}`}
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name} </h1>
            {activeStatus ? <h1>Active Now</h1> : <h1>offline</h1>}
          </div>
        </div>
        <BsArrowRightCircle
          size={30}
          onClick={() => setOpen(false)}
          className="cursor-pointer"
        />
      </div>
      {/* messages section */}
      <div className="overflow-y-auto flex-1 h-[65vh] py-1 px-3 ">
        {messages &&
          messages.map((item, index) => (
            <div key={index} className="px-2 py-1">
              <div>
                <div
                  className={`flex w-full my-2 ${
                    item.sender === sellerId ? "justify-end" : "justify-start"
                  }`}
                >
                  {item.sender !== sellerId && (
                    <img
                      src={`${userData?.avatar.url}`}
                      alt=""
                      className="w-[40px] h-[40px] rounded-full mr-3"
                    />
                  )}
                  <div>
                    {item.sender !== sellerId ? (
                      <div className="w-auto rounded-md px-2 py-1 bg-green-500 text-white">
                        <p className="w-[]">{item.text}</p>
                      </div>
                    ) : (
                      <div className="w-auto rounded-md px-2 py-1 bg-slate-500 text-white">
                        <p className="w-[]">{item.text}</p>
                      </div>
                    )}
                    <p className="text-[#00000094] text-end">
                      {format(item.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div ref={messagesEndRef} />
            </div>
          ))}
      </div>
      {/* Send message form */}
      <form
        aria-required={true}
        className="p-7 w-full flex justify-between items-center bg-white shadow-md sticky bottom-0 z-5"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[] mr-2">
          <GrGallery size={30} className="cursor-pointer" />
        </div>

        <div className="w-[95%]">
          <input
            type="text"
            placeholder="Enter Your message...."
            className={`${styles.input} p-4 !rounded-[30px] w-full`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
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
  );
};

export default ShopInbox;
