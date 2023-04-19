
const io = require("socket.io")(3001, {
    cors: {
      origin: "*",
    },
  });
  

  
  let activeUsers = [];
  
io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (userData) => {
    // if user is not added previously
    const {username, pfp} = userData;
    if (!activeUsers.some((user) => user.userId === username)) {
      activeUsers.push({ userId: username, pfp: pfp , socketId: socket.id });
      console.log("New user connected,")
      // console.log("New User Connected", activeUsers);

      // send all active users to new user
      io.emit("get-users", activeUsers);
    }
    // fix if already logeed in, and have multiple browser tbas open
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