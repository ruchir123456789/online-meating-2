const express = require("express");
const app = express();
const server = require('http').Server(app)//this appows us to create server thet we can conect to Socket.io -- this creates a server
const io = new require('socket.io')(server)//passing in server in socket.io so thsat it can know how the server of our is runing
const {v4 :uuidV4} =require('uuid')//this is to generate random room ids

const PORT = 3000;

const port = process.env.port || PORT ;


app.set("view engine",'ejs');
app.use(express.static('public'))

app.get('/',(req,res)=>{
   res.redirect(`/${uuidV4()}`)
})

app.get('/:room',(req,res)=>{
    res.render('room',{roomId:req.params.room})
})

//
app.get("*",(req,res)=>{
    const protocol = req.protocol;
const host = req.hostname;
const url = req.orignalUrl;
const port = process.env.port || PORT ;
const PORT = "3000";

const fullUrl = { url:`${protocol}://${host}:${port}${url}`} 

})
//

io.on('connection', (socket)=>{
    console.log("connection done")
    socket.on('join-room', (roomId, userId)=>{
        // console.log(roomId, userId);
        socket.join(roomId)//join every one to roomId
        socket.to(roomId).emit('user-connected',userId)//telling every other user except for us that a user  is joined

        socket.on('disconnect',()=>{
            socket.to(roomId).emit('user-disconnected',userId)
        })
    })
    console.log("Connected...");
    socket.on('message',(msg)=>{
        // console.log(msg);
        // socket.broadcast.emit('message',msg);
        socket.broadcast.emit('message',msg);

        
    })


})

server.listen(3000)

// const http = require('http').createServer(app)
// const io1 =require('socket.io')(http)

// io1.on('connection', (socket)=>{
    // console.log('Connected...')
    // socket.on('message',(msg)=>{
    //     console.log(msg)
    //     socket.broadcast.emit('message',msg)
    // })
// })