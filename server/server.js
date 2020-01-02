const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const router = require('./routes/index');
const port = 3600
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

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))