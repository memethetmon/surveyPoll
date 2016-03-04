var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
	return {
		login: function(req, res) {
			console.log(req.body);

			User.findOne({name: req.body.name}, function(err, user) {
				if(err)
					console.log(err);
				if(user)
					res.json(user);
				else {
					var user = new User(req.body);
					user.save(function(err) {
						if(err)
							console.log(err);
						else
							res.json(user);
					})
				}
			})
		}
	}
})();