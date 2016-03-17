var express = require('express');
var bodyParser = require('body-parser'); 
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Jinglr = require('./src/public/models/JinglrModel')
var Message = require('./src/public/models/MessageModel')
var cookieParser = require('cookie-parser')
var morgan = require('morgan')
var passport = require('passport')
var db ='mongodb://127.0.0.1:27017/test';

mongoose.connect(db);
require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
	}))

app.use(express.static(__dirname + "/src/public")); 
app.use(morgan('dev'))
app.use(cookieParser());
app.use(session({secret: 'mysecret',
				saveUninitialized: true,
				resave: true}));
app.use(passport.initialize());
app.use(passport.session())

app.get('/Jinglrs', function (req, res) { 
	console.log('finding all jinglrs in Jinglrs')
	Jinglr.find({}).exec(function(err, jinglrs){
		if(err){
			console.log('error hath occured')
		} else {
			console.log(req.cookies);
			console.log(req.session);
			res.json(jinglrs);
		}
	});
});

/*

app.get('/Jinglr', function (req, res) {
	var username_from_request = req.body.username
	Jinglr.findOne({
		username: username_from_re
		})
	.exec(function(err, jinglr){
		if (err){
			res.send('error occured in trying to find this Jinglr')
		} else {
			console.log(jinglr)
			res.json(jinglr)
		}
	});
});
*/

app.post('/Jinglrs', passport.authenticate('local-signup', {
	successRedirect: '/#/login',
	failureRedirect: '/#/login'
}))


app.post('/Messages', function (req, res) { //server behavior connected to $scope.addContact()..but how?
		var newMessage = new Message();
		newMessage.words = req.body.words;
		newMessage.toUserId = req.body.toUserId;
        newMessage.fromUserId = req.body.fromUserId;
        newMessage.toUserName = req.body.toUserName;
        newMessage.fromUserName = req.body.fromUserName;
		Jinglr.findOne({ _id: newMessage.toUserId }, function (err, doc){
				  doc.receivedMessages.push(newMessage)
				  doc.save();
				});
		Jinglr.findOne({ _id: newMessage.fromUserId }, function (err, doc){
				  doc.sentMessages.push(newMessage)
				  doc.save();
				});
						///here push the message into both users' messages arrays...
			newMessage.save(function() {
					res.json(newMessage)
					});

					})

app.get('/Jinglrs/:JinglrId', function (req, res) {
	var userId = req.params.JinglrId
	Jinglr.findOne({
		_id: userId
		})
	.exec(function(err, jinglr){
		if (err){
			res.send('error occured in trying to find this Jinglr')
		} else {
			console.log(jinglr)
			res.json(jinglr)
		}
	});
});

app.delete('/Jinglrs/:JinglrId', function (req, res) {
	var id = req.params.JinglrId;
	Jinglr.find({_id: id}).remove().exec(function (err, doc){ 
		res.json(doc);
	});
});

/*
app.post('/login', passport.authenticate('local-login', {
	successRedirect: '/#/JinglrsNearby',
	failureRedirect: '/#/login'
}))
*/

app.post('/login', function(req, res, next) {
 	 passport.authenticate('local-login', function(err, user, info) {
	    if (err) {
	      return res.status(500).json({err: err});
	    }
	    if (!user) {
	      return res.status(401).json({err: info});
	    }
	    req.logIn(user, function(err) {
	      if (err) {
	        return res.status(500).json({err: 'Could not log in user'});
	    }
			    var name = req.body.username;
				Jinglr.findOne({
					username: name
					})
				.exec(function(err, jinglr){
					if (err){
						res.send('error occured in trying to find this Jinglr')
					} else {
						console.log("here is yr jinglr" + jinglr)
						res.json(jinglr)
					}
			});
	    });
	})(req, res, next);
 
});

app.listen(8080)
console.log("Server for digits (really) 'funning' on 8080")
