const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });


var us = {};

// app.set("view engine", "ejs");

app.get('/Ram', (req, res) => {
    var ur = req.url;
    ur = ur.replace('/Ram?', '').replace('user=', '').replace('&', ',').replace('pass=', '');
    ur = ur.split(',');
    var gu = us[ur[0]];
    
        res.send(gu['ram']);
        console.log('User-Ram ' + ur[0]);
    
});

app.get('/RRam', (req, res) => {
    var ur = req.url;
    ur = ur.replace('/Ram?', '').replace('user=', '').replace('&', ',').replace('pass=', '');
    ur = ur.split(',');
    var gu = us[ur[0]];
    delete us[ur[0]];
        res.send('Done');
        console.log('User-Remove ' + ur[0]);
    
});

app.get('/new-user', (req, res) => {
    var gu = req.url;
    gu = gu.replace('/new-user?', '').replace('&', ',').replace('=', '').replace('user', '');
    us[gu] = {"ram": {}};
    res.send('Done');
    console.log('New-User ' + gu);
});

app.get('/set-ram', (req, res) => {
    var gu = req.url;
    gu = gu.replace('/set-ram?', '').replace('&', ',').replace('=', '').replace('user', '').replace('var', '').replace('value', '').replace('=', '').replace('&', ',').replace('=', '');
    gu = gu.split(',');
    us[gu[0]]['ram'][gu[1]] = gu[2];
    res.send('Done');
});

app.get('/get-ram', (req, res) => {
    var gu = req.url;
    gu = gu.replace('/get-ram?', '').replace('&', ',').replace('=', '').replace('user', '').replace('var=', '').split(',');
    res.send(us[gu[0]]['ram'][gu[1]]);
});

app.get('/vie', (req, res) => {
    res.send('Wellcome TO VRam API.');
})

server.listen(3001, '192.168.1.4', () => {
    console.log("Server running....");
});

// var vram = {};
// var user = 0;
// var name = '';

// io.on("connection", (socket) => {
//     // console.log("User connected... user id = " + socket.id);
//     if (user > 0){
//         socket.emit('exit', 0);
//     }
//     else{
//         user += 1;
//         name = socket.id;
//     }
//     socket.on("ADTR", (data) => {
//         // console.log("User id = {" + data[0] + "} send : " + data[1]);
        
//     });

//     socket.on("remove", (data) => {
//         // console.log("User id = {" + data[0] + "} send : " + data[1]);
        
//     });

//     socket.on('disconnect', () =>{
//         if (socket.id == name){
//             vram = {};
//             user = 0;
//         }
//     });
    
// });
