const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const router = require('./routes/index');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3600
const { addUser, getUser} = require('./utils/users')
require('dotenv').config()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
        extended: true }))
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);


const mongoURI = process.env.mongoURI;

mongoose
    .connect(mongoURI, { useNewUrlParser: true, 
                        useUnifiedTopology: true })
	.then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
    
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;


io.on('connection', (socket) => {

    socket.on('login', ({username}) => {
        addUser({ id: socket.id, username})
        socket.join('default')
    })

    socket.on('chat', (data, err) => {
        const user = getUser(socket.id);

        io.to('default').emit('message', { user: user.username, text: data })
    })


    
})

server.listen(port);
