const express = require('express');
const router = express.Router();
const USER = require('../database/userModel');
const { hashPassword, comparePasswords, generateToken } = require('./authServices');
 
router.post('/signup', async(req,res) =>{
  const {username, password} = req.body;
  if(!username || !password || username.length < 6 || password.length < 6){
    return res.status(400).json({msg: "Username and password should contain more than 5 characters"})
  }
  try{
    let admin = await USER.findOne({username,isAdmin : true});
  if(admin){
    return res.status(400).json({msg:'Admin already exists'});
  }
  const hashedPassword = await hashPassword(password);
  let newAdmin = USER({
    username,
    password: hashedPassword,
    isAdmin: true,
  })
  await newAdmin.save();

  res.status(201).json({msg: "Admin registered successfully"});
  }
    catch(err){
      console.error(err.message);
      res.status(500).send('server error')
    }
  });

  router.post('/login', async(req,res) =>{
    const{username, password} = req.body;
    try{
      let existingAdmin = await USER.findOne({username, isAdmin : true});
      if(!existingAdmin){
        return res.status(401).json({msg: "Invalid Credentials"});
      }
      const isMatch = await comparePasswords(password, existingAdmin.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
  
    const token = generateToken(existingAdmin);
    res.status(200).json({ msg: "Admin logged in successfully", token });

  }
    catch(error){
      console.error(err.message);
      res.status(500).send("server error")
    }
});

  module.exports = router;
  

  