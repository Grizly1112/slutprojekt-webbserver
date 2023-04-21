/* This code is creating a socket.io server instance that listens on port 3001 and allows cross-origin
resource sharing (CORS) from any origin. */

const io = require("socket.io")(3001, {
    cors: {
      origin: "*",
    },
  });
  


// Online users list
var activeUsers = [];
  
io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (userData) => {
    const { username, pfp } = userData;
    
    let userId;
    if (username) {
      userId = username;
    } else {
      userId = `guest-${Math.floor(Math.random() * 1000)}`;
    }
  
    // check if user is not added previously
    if (!activeUsers.some((user) => user.userId === userId)) {
  
      activeUsers.push({ userId: userId, pfp: pfp , socketId: socket.id });
      console.log("New user connected,")
  
      // send all active users
      io.emit("get-users", activeUsers);
    } 
  
    // necessary to fix if already logeed in, and have multiple browser tbas open
    io.emit("get-users", activeUsers);
  })

  socket.on('getOnlineUSers', (name) => {
    io.emit('get-users', activeUsers);
  })

  socket.on("disconnect", () => {
    // remove user from active users
    currentUser = activeUsers.filter((user) => user.socketId === socket.id);
    // SetUserLastSeen(currentUser.username)
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected");
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId)
    console.log("Data: ", data)
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});