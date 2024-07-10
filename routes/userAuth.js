const express = require('express');
const router = express.Router();
const USER = require('../database/userModel');
const { trusted } = require('mongoose');

 
router.post('user/signup', async(req,res) =>{
  const {username, password} = req.body;
  if(!username || !password || username.length < 6 || password.length < 6){
    return res.status(400).json({msg: "Username and password should contain more than 5 characters"})
  }
  try{
    let user = await USER.findOne({username});
  if(user){
    return res.send(400).json({msg:'User already exists'});
  }
  let newUser = USER({
    username,
    password,
    isAdmin: false,
  })
  await newUser.save();

  res.status(201).json({msg: "User registered successfully"});
  }
    catch(err){
      console.error(err.message);
      res.status(500).send('server error')
    }
  });

  router.post('user/login', async(req,res) =>{
    const{username, password} = req.body;
    try{
      let existingUser = await USER.find({username});
      if(!existingUser){
        return res.status(401).json({msg: "Invalid Credentials"});
      }
      if (password !== existingUser.password) {
        return res.status(401).json({ msg: "Invalid Credentials" });
      }
      res.status(200).json({msg: "User loggedin Successfully"});
    }
    catch(error){
      console.error(err.message);
      res.status(500).send("server error")
    }

  });

  module.exports = router;
  

  