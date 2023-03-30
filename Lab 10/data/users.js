const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user_collection;
const helpers = require('../helpers');
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');


const createUser = async (username, password) => {
  let user = helpers.checkUsername(username);
  let pswd = helpers.checkPass(password);
  user = user.toLowerCase();
  //Check for duplicate usernames
  const userCollection = await users();
  const thisUser = await userCollection.findOne({username: user});
  if(thisUser) throw 'Error: the given username is already taken';
  //hash the password
  pswd = await bcrypt.hash(pswd, 16);
  const newUser = {
    username: user,
    password: pswd
  };
  const insertInfo = await userCollection.insertOne(newUser);
  if(!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Error: Could not add user';
  //On success, return {insertedUser: true}
  return {insertedUser: true};
};

const checkUser = async (username, password) => {
  let user = helpers.checkUsername(username);
  let pswd = helpers.checkPass(password);
  user = user.toLowerCase();
  const userCollection = await users();
  const thisUser = await userCollection.findOne({username: user});
  if(!thisUser) throw 'Error: The provided username does not have an account';
  let compPswd = await bcrypt.compare(pswd, thisUser.password);
  if(!compPswd) throw 'Error: The provided password is incorrect';
  return {authenticatedUser: true};
};

module.exports = {
  createUser,
  checkUser
};
