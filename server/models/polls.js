var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
	name: String,
	// user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	question: String,
	options: {
	  	option1: String, vote1: {type: Number, default: 0}, option2: String, vote2: {type: Number, default: 0},
	  	option3: String, vote3: {type: Number, default: 0}, option4: String, vote4: {type: Number, default: 0}
	},
	created_at: {type: Date, default: Date.now}
});

mongoose.model('Poll', PollSchema);