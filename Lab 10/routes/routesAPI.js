//require express, express router and bcrypt as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const bcrypt = require('bcrypt');
const helpers = require('../helpers');
///////////////////////////////////////////
router
  .route('/')
  .get(async (req, res) => {
    if(req.session.user){
      res.redirect('/protected');
    }
    else{
      res.render('userLogin', {title: 'User Login', err: ''});
    }
  })
////////////////////////////////////////////
router
  .route('/register')
  .get(async (req, res) => {
    if(req.session.user){
      res.redirect('/protected');
    }
    else{
      res.render('userRegister', {title: 'User Registration', err: ''});
    }
  })
  .post(async (req, res) => {
    try{
      req.body.usernameInput = helpers.checkUsername(req.body.usernameInput);
      req.body.passwordInput = helpers.checkPass(req.body.passwordInput);
    }catch(e){
      return res.status(400).render('userRegister', {title: 'User Registration', err: e});
    }
    try{
      let result = await userData.createUser(req.body.usernameInput, req.body.passwordInput);
      if(result.insertedUser){
        return res.redirect('/');
      }
      throw 'Internal Server Error';
    }catch(e){
      res.status(500).render('userRegister', {title: 'User Registration', err: e});
    }
  })
////////////////////////////////////////////
router
  .route('/login')
  .post(async (req, res) => {
    try{
      req.body.usernameInput = helpers.checkUsername(req.body.usernameInput);
      req.body.passwordInput = helpers.checkPass(req.body.passwordInput);
    }catch(e){
      return res.status(400).render('userLogin', {title: 'User Login', err: e});
    }
    try{
      let result = await userData.checkUser(req.body.usernameInput, req.body.passwordInput);
      if(result.authenticatedUser){
        req.session.user = {username: req.body.usernameInput};
        res.redirect('/protected');
      }
    }catch(e){
      res.status(400).render('userLogin', {title: 'User Login', err: e});
    }
  })
/////////////////////////////////////////////
router
  .route('/protected')
  .get(async (req, res) => {
    if(!req.session.user){
      return res.status(403).render('forbiddenAccess', {title: 'Forbidden Access', err: 'You are not logged in'});
    }
    res.render('private', {title: "Private User Info", username: req.session.user.username, dateTime: new Date().toUTCString()});
    
  })
/////////////////////////////////////////////
router
  .route('/logout')
  .get(async (req, res) => {
    //code here for GET
    req.session.cookie.expires = new Date(Date.now());
    res.render('logout', {title: 'Logged Out'});
  })

  module.exports = router;