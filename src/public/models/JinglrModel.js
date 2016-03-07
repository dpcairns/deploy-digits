var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Jinglr = new Schema({
	username: {
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	joinDate: {
		type: Date,
		default: Date.now
	},
	cute: {
		type: Boolean,
		default: false
	},
	digits: Array,
	superInteger: Number
});


module.exports = mongoose.model('Jinglr', Jinglr)
