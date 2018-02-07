const port = process.env.PORT || 10000;
const server = require("http").Server();

var io = require("socket.io")(server);

var allusers = [];

//when someone is connecting
io.on("connection", function(socket){
    console.log("connect");
    allusers.push(socket.id);
    console.log(allusers);
    
    io.emit("userjoined", allusers);
    
    //only sends a message back to the socket that connected, but io sends it everybody
    socket.emit("yourid", socket.id);
    
    socket.on("mymove", function(data){
        //broadcast = send it to everybody but myself
       socket.broadcast.emit("newmove", data); 
    });
    
    //when socket disconnects
    socket.on("disconnect", function(){
        var index = allusers.indexOf(socket.id);
        allusers.splice(index, 1);
        io.emit("userjoined", allusers);
    })
});

server.listen(port, (err)=>{
   if(err){
       console.log(err);
       return false;
   } 
    
    console.log("Port is running");
});