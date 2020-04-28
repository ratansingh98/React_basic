// Necessary imports
const express =  require('express');
const socketio = require('socket.io');
const http=require('http');
const cors = require('cors');
const {addUser,removeUser,getUser,getUsersInRoom} =require('./users.js');

//set port number
const PORT = process.env.PORT || 5005


const router = require('./router');//Link router script

// Create and link socket io to server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// When io is connect
io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
  
      if(error) return callback(error);
  
      socket.join(user.room);
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });
  
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
      
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    });
  
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
  
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })
  });

// Use Router for app
app.use(router);
app.use(cors());
server.listen(PORT,()=> console.log(`Server has started on port ${PORT}`));
