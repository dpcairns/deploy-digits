var LocalStrategy = require('passport-local').Strategy;
var Jinglr = require('../src/public/models/JinglrModel')
	
module.exports = function(passport){
	var digitMaker = function(){
		var numbers = [];
		var i = 0
		while(i<7){
		   		numbers.push(Math.round(Math.random() * 25));
		   		i++
			}
			return numbers
		}	

	passport.serializeUser(function(user, doneCallback){
			doneCallback(null, user.id);
	});


	passport.deserializeUser(function(id, doneCallback){
		Jinglr.findById(id, function(err, user){
			doneCallback(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, doneCallback){
		process.nextTick(function(){ //this doesnt execture until everything else is done
			Jinglr.findOne({'username': req.body.username}, function(err, user){
				if(err)
					return doneCallback(err);
				if(user){
					return doneCallback(null, false);
				} else {
					var newJinglr = new Jinglr();
					newJinglr.username = req.body.username;
					newJinglr.password = req.body.password;
					newJinglr.cute = req.body.cute;
					newJinglr.digits = digitMaker();
					newJinglr.superInteger = Math.floor(Math.random()*25)

					newJinglr.save(function(err) {
						console.log("passport register says here is your new jinglr")
						console.log(newJinglr.username)	
					})
					}
				}
		
		)
	})
})
);
passport.use('local-login', new LocalStrategy({
		passReqToCallback: true
	},
	
	function(req, username, password, doneCallback){
		process.nextTick(function(){ //this doesnt exectute until everything else is done
			Jinglr.findOne({'username': req.body.username}, function(err, user){
				if(err)
					return doneCallback(err);
				if(!user){
					return doneCallback(null, false);
				} 
				if(user.password != password){

					return doneCallback(null, false)
				}
					return doneCallback(null, user)
					})
				})

		}
	
	));
};