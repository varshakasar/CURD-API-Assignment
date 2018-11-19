var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var async = require('async');
var request = require('request');
var promise = require('promise');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();
app.use(passport.initialize());
app.use(passport.session());

let empSchema = new mongoose.Schema({
  empname: String,
  empdesignation: String
})

var empModel = mongoose.model('empdb', empSchema);

/*router.get('/', passport.authenticate('local',function(req, res) {
  //res.send("HOME..");
  res.send(req.body.email);
}));*/


/*
router.get('/getAllEmployee',function(req,res){

	//res.send('In getting all data route');

	empModel.find({}).exec(function(err,data){
		if(err){
			console.log('Error in getting all data');
		}
		else{
			console.log('Success in getting all data');
			res.send(data);
		}
	})
})*/
router.get('/getAllEmployee', function(req, res) {

  var mypromise = new Promise(function(resolve, reject) {
    empModel.find({}).exec(function(err, data) {

      if (err) {
        console.log('Error in getting all data');
        reject(err)
      } else {
        console.log('Success in getting all data');
        resolve(data);
      }
    });
  });

  mypromise.then(
    result => res.send(result),
    error => res.send(error)
  );
});



router.post('/newEmployee', function(req, res) {

  //res.send('In new employee route');

  var name = req.body.name;
  var desig = req.body.desig;
  var empObject = new empModel({
    empname: name,
    empdesignation: desig
  });
  empObject.save(function(err, data) {
    if (err) {
      console.log('Error in save operation');
    } else {
      console.log('Save successfully');
    }
  })
})

router.put('/updateEmployee/:name', function(req, res) {

  //res.send('In update employee route');

  var nm = req.params.name;
  var d = req.body.desig;
  var obj = {
    empdesignation: d
  };
  var query = {
    $set: obj
  };
  empModel.findOneAndUpdate({
      empname: nm
    },
    query,
    function(err, data) {
      if (err) {
        console.log('Error in updation');
      } else {
        console.log('Updation done successfully');
      }
    });

})

router.delete('/deleteEmployee/:name', function(req, res) {

  //res.send('In delete employee route');
  var nm = req.params.name;
  empModel.findOneAndDelete({
      empname: nm
    },
    function(err, data) {
      if (err) {
        console.log('Error in deletion');
      } else {
        console.log('Deletion done successfully');
      }
    })
})

//export router
module.exports = router;
