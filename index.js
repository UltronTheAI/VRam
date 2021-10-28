const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

var use = {};
var usedata = {};

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('home');
});
// app.get('/down', (res, req) => {
//     req.sendFile('D:\\wsl\\this.txt');
// });
// app.get('/chat', (res, req) => {
//     req.send('function Chat(name, cont, id){ \
//     document.querySelector(cont).innerHTML += \'<iframe src="http://192.168.1.4:3001/?n=\' + name + \'" id="\' + id + \'"></iframe>\'; \
// } \
//  \
// function ChatSend(name, message){ \
//     \
// } \
// \
// function ChatRemove(id){ \
//     document.getElementById(id).remove(); \
// } \ ');
// });

server.listen(3001, () => {
    console.log("Server running....");
});

io.on("connection", (socket) => {
    console.log("User connected... user id = " + socket.id);

    socket.on("message", (data) => {
        console.log("User id = {" + data[0] + "} send : " + data[1]);
        socket.broadcast.emit('message', data);
        if (data[1] == 'Join the chat...'){
            use[socket.id] = data[0];
            console.log('user Join ' + use[socket.id]);
        }
    });
    
    socket.on('disconnect', () =>{
        console.log("User disconnected... user id = " + socket.id + "\t,\t" + use[socket.id]);
        socket.broadcast.emit("message", [use[socket.id], "Leave the chat..."]);
        delete use[socket.id];
        delete socket;
    });
    
});
