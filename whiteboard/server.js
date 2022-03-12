
var app=require('express')(); //to include express.js
// const http = require('http');  //http include krne k lie taki uska server le 

// https://stackoverflow.com/questions/18864677/what-is-process-env-port-in-node-js
var server=app.listen(process.env.PORT || 3000); 


// app.use(express.static('code')); //code wale folder ki files ko use krne ka wo denge app ko

var io=require('socket.io')(server);  //fr making a socket we require socket.io so we included that and named that connection as io
io.sockets.on("connection",Connected);  //now when the client will emit a connection event it will call the function newConnection

function Connected(socket)
{
    console.log("cpnnection made with id=" ,socket.id);
    var currRoomId='12345';
    socket.on('create',(room)=>{
        socket.join(room);
        currRoomId=room;
    });

    socket.on('move',moveMessage);

    function moveMessage(data){
        //will emit an event to all the clients except the sender
        //to jb koi ek room me hai to agar ek client draw krra h to usko chor k bakiyo k lie ye draw kr dega event emit krke
        socket.to(currRoomId).emit('move',data);
        
    }

}

