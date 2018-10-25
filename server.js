const express=require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
// const socketIO = require('socket.io');

const teamRoutes = require('./_API/routes/team');
const partyRoutes = require('./_API/routes/party');
const userRoutes = require('./_API/routes/user');
const songRoutes = require('./_API/routes/song');
const requestRoutes = require('./_API/routes/request');

const app = express();
const port = process.env.PORT || 3000;
const databaseURL = 'mongodb://localhost:27017/KSJv2';
// Database Connection
mongoose.Promise = global.Promise;
mongoose.connect(databaseURL, (err) => {
    if (err){
        console.log('DataBase Connection Error :', err);
    } else {
        console.log('Successfully Connected to Database');
    }
});
// Middleware
app.use(cors({origin: 'http://localhost:4200'}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use('/api/team', teamRoutes);
app.use('/api/party', partyRoutes);
app.use('/api/user', userRoutes);
app.use('/api/song', songRoutes);
app.use('/api/request', requestRoutes);

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const server = http.createServer(app);
// const io = socketIO(server);
// io.on('connection', (socket)=>{
//     console.log('new User Connected');
    
//     socket.on('disconnect',()=>{
//         console.log('User Disconnected');
//     })
// });
server.listen(port,()=>{
    console.log('Server running on : '+port);
});