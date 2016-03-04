var user = require('./../controllers/user.js');
var polls = require('./../controllers/polls.js');

module.exports = function(app) {
	app.post('/user', user.login)
	app.post('/polls', polls.createPoll)
	app.get('/polls', polls.getPolls)
	app.delete('/polls/:id', polls.delete)
	app.get('/polls/:id', polls.showPoll)
	app.post('/polls/:id/vote', polls.vote)
}