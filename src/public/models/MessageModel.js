var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Message = new Schema({
	words: {
		type: String,
		required: true
	},
	toUserId:{
		type: String,
		required: true
	},
	toUserName:{
		type: String,
		required: true
	},
	fromUserId:{
		type: String,
		required: true
	},
	fromUserName:{
		type: String,
		required: true
	},
	timeStamp: {
		type: Date,
		default: Date.now
	},
	read: {
		type: Boolean,
		default: false
	},
	
});


module.exports = mongoose.model('Message', Message)

