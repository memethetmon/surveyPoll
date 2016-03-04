// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');

module.exports = (function() {

  return {
    getPolls: function(req, res){
      Poll.find({}, function(err, results) {
        if(err) {
          console.log(err);
        }
        else {
          res.json(results);
        }
      })
    },

    createPoll: function(req, res){

      var poll = new Poll(req.body);
      poll.save(function(err){
        if(err)console.log(err);
        res.json(true);
      })
    },

    delete: function(req, res) {
      Poll.remove({_id: req.params.id}, function(err) {
        if (err)
          console.log(err);
        res.json('true');
      })
    },

    showPoll: function(req, res) {
      Poll.findOne({_id: req.params.id}, function(err, poll){
        if(err) console.log(err);
        res.json(poll);
      })
    },
        
    vote: function(req, res) {
      Poll.findOne({_id: req.params.id}, function(err, poll) {
        if(err) console.log(err);

        var option = poll.options.id(req.body._id);
        poll.options.vote++;
        poll.save(function(err) {
          if(err) console.log(err);
          res.json(true);
        })
      })
    }
  }
})();