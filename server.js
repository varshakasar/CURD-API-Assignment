const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
var indexRouter = require('./index');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/empdb',{useNewUrlParser: true},function(err,data){
	if(err){
		console.log('Error in connection');
	}
	else{
		console.log('Successfully connected');
	}
})
app.use('/',indexRouter);
// listen for requests
app.listen(3000);