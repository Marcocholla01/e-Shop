const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIO(server); // Attach Socket.IO to the server

require("dotenv").config({
  path: "config/.env",
});

const port = process.env.PORT || 1002;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from socket server');
});

let users = [];

// Function to add user to the list
const adduser = (userId, socketId) => {
  !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId });
};

// Function to remove user from the list
const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId);
};

// Function to get user by receiver ID
const getUser = (recieverId) => {
  return users.find(user => user.userId === recieverId);
};

// Function to create a message object
const createMessage = ({ senderId, recieverId, text, images }) => ({
  senderId,
  recieverId,
  text,
  images,
});

// Listening for a connection
io.on('connection', (socket) => {
  console.log('A user is connected');

  // When a user adds themselves
  socket.on('addUser', (userId) => {
    adduser(userId, socket.id);
    io.emit('getUsers', users);
  });

  const messages = {}; // Object to track messages sent to each user

  // Handle send message event
  socket.on('sendMessage', ({ senderId, recieverId, text, images }) => {
    const message = createMessage({ senderId, recieverId, text, images });
    const user = getUser(recieverId);

    // Store messages in messages object
    if (!messages[recieverId]) {
      messages[recieverId] = [message];
    } else {
      messages[recieverId].push(message);
    }

    // Send message to the receiver
    io.to(user?.socketId).emit('getMessage', message);
  });

  // Handle message seen event
  socket.on('messageSeen', ({ senderId, recieverId, messageId }) => {
    const user = getUser(senderId);

    // Update seen flag
    if (messages[senderId]) {
      const message = messages[senderId].find(
        message => message.recieverId === recieverId && message.id === messageId
      );

      if (message) {
        message.seen = true;

        // Send message seen event to the sender
        io.to(user?.socketId).emit('messageSeen', {
          senderId,
          recieverId,
          messageId,
        });
      }
    }
  });

  // Handle update last message event
  socket.on('updateLastMessage', ({ lastMessage, lastMessageId }) => {
    io.emit('getLastMessage', {
      lastMessage,
      lastMessageId,
    });
  });

  // When a user disconnects
  socket.on('disconnect', () => {
    console.log('A user is disconnected');

    // Remove user from the list
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

server.listen(port, () => {
  console.log(`Socket server running on: http://127.0.0.1:${port}`);
});
