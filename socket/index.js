const express = require(`express`);
const cors = require(`cors`);
const socketIO = require(`socket.io`);
const http = require(`http`);
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

require("dotenv").config({
  path: "config/.env",
});

const port = process.env.PORT || 1002;

app.use(cors(
 { origin: [
    "https://shop0-bice.vercel.app",
    "http://192.168.1.100:1001",
    "http://localhost:1001",
    "http://127.0.0.1:1001",
  ],}
));
app.use(express.json());

app.get(`/`, (req, res) => {
  res.send(`hello from socket server`);
});

let users = [];

// add user to socket when start chat
const adduser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// Remove user from  socket when left chat
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// Get user on socket
const getUser = (recieverId) => {
  users.find((user) => user.userId === recieverId);
};

// define a message object with seen property
const createMessage = ({ senderId, recieverId, text, images }) => ({
  senderId,
  recieverId,
  text,
  images,
});

// listening for a connection
io.on(`connection`, (socket) => {
  // when a user connected
  console.log(`A user is connected`);

  // take userId and socketId from user
  socket.on(`addUser`, (userId) => {
    adduser(userId, socket.id);
    io.emit(`getUsers`, users);
  });

  // send and get message
  const messages = {}; // Object to track messages sent to each user

  socket.on(`sendMessage`, ({ senderId, recieverId, text, images }) => {
    const message = createMessage({ senderId, recieverId, text, images });

    const user = getUser(recieverId);

    // Store messages in `messages` object
    if (!messages[recieverId]) {
      messages[recieverId] = [message];
    } else {
      messages[recieverId].push(message);
    }

    // send message to the reciever
    io.to(user?.socketId).emit(`getMessage`, message);
  });

  //  message seen
  socket.on(`messageSeen`, ({ senderId, recieverId, messageId }) => {
    const user = getUser(senderId);

    // update seen flag
    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.recieverId === recieverId && message.id === messageId
      );

      // if message is seen
      if (message) {
        message.seen = true;

        // send message seen event to the sender
        io.to(user?.socketId).emit(`messageSeen`, {
          senderId,
          recieverId,
          messageId,
        });
      }
    }
  });

  // update and get last messg=age
  socket.on(`updateLastMessage`, ({ lastMessage, lastMessageId }) => {
    io.emit(`getLastMessage`, {
      lastMessage,
      lastMessageId,
    });
  });

  // whena user disconnected
  socket.on(`disconnect`, () => {
    console.log(`a user is disconnected`);

    // remove user from the socket
    removeUser(socket.id);
    io.emit(`getUsers`, users);
  });
});

server.listen(port, () => {
  console.log(`Socket server running on : http://127.0.0.1:${port}`);
});
