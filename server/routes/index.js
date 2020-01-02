const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const User = require('../models/User')
const secret = process.env.secret;


router.post('/register', (req, res) => {

    const {username, email, password} = req.body;

    const userData = {
        username, 
        email, 
        password
    }

    User.findOne({ username}, (err, user) => {
        if(user){
            res.status(400).send({ msg: 'Username already exists!'})
        }
        else {
            bcrypt.hash(password, 10, (err, hash) => {
                userData.password = hash;
                User.create(userData, (err, data) => {
                  if (err) {
                    res.status(500).send({ msg: err.message })
                  }
                  else {
                    res.status(200).send({ msg: 'User successfully registered!'})
                  }
                })
            })
        }
    })
})

router.post('/login', (req, res) => {

    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
      if (!user) {
        res.send({ msg: 'The email address is not found' })
      } else if (user) {
  
        if (bcrypt.compareSync(password, user.password)) {

            let payload = {
              username: user.username
            }
            let userToken = jwt.sign(payload, secret, {
              expiresIn: 1400
            });
            res.json({ userToken });
        }
      }
    })
  })

module.exports = router