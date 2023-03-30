//Require express and express router as shown in lecture code and worked in previous labs
const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.people;
const helpers = require('../helpers');
const path = require('path');

router.route("/").get(async (req, res) => {
  //code here for GET
  res.sendFile(path.resolve('static/homepage.html'));
});

router.route("/searchpeople").post(async (req, res) => {
  //code here for POST
  try{
    req.body.searchPersonName = helpers.checkString(req.body.searchPersonName, 'searchPersonName');
  }catch(e){
    res.status(400).render('error', {title: 'Error', error: e})
    return;
  }
  try{
    let results = await peopleData.searchPeopleByName(req.body.searchPersonName);
    res.render('peopleFound', {title: 'People Found', searchPersonName: req.body.searchPersonName, people: results});
  }catch(e){
    res.status(404).render('personNotFound', {title: 'Not Found', searchPersonName: req.body.searchPersonName});
  }
});

router.route("/persondetails/:id").get(async (req, res) => {
  //code here for GET
  try{
    req.params.id = helpers.checkNumber(req.params.id, 'id');
  }catch(e){
    res.status(400).render('error', {title: 'Error', error: e})
    return;
  }
  try{
    let result = await peopleData.searchPeopleByID(req.params.id);
    res.render('personFoundByID', {title: 'Person Found', info: result});
  }catch(e){
    res.status(404).render('personNotFoundByID', {title: 'Not Found', id: req.params.id});
  }
});

module.exports = router;
