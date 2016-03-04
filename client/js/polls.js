angular.module('app')
  .controller("PollsController", PollsController)
  .factory("PollsFactory", PollsFactory);

  function PollsController($scope, UserFactory, PollsFactory, $location, $routeParams) {
    $scope.currentUser = UserFactory.getCurrentUser();
    if(!$scope.currentUser){
      $location.path('/');
    }

    getPolls = function() {      
      PollsFactory.getPolls(function(response) {
        $scope.polls = response.data;
      });
    }

    getPolls();
    
    $scope.createPoll = function(poll) {
      poll.name = $scope.currentUser.name;
      // console.log(poll);

      PollsFactory.createPoll(poll, function() {
        alert("Poll successfully added!");
        $location.path('/dashboard');
      });
    }

    $scope.delete = function(poll) {
      PollsFactory.delete(poll, getPolls);
    }

    PollsFactory.showPoll($routeParams.id, function(response) {
      $scope.poll = response.data;
      console.log($scope.poll);
    })

    $scope.vote = function(answer) {
      PollsFactory.vote($routeParams.id, option, function() {
        PollsFactory.showPoll($routeParams.id, function(response) {
          $scope.poll = response.data;
        })
      })
    }
  }

  function PollsFactory($http) {
    var Poll = {};

    Poll.getPolls = function(callback) {
      $http.get('/polls').then(callback);
    }
    Poll.createPoll = function(poll, callback) {
      $http.post('/polls', poll).then(callback);
    }
    Poll.delete = function(poll, callback) {
      $http.delete('/polls/' + poll._id).then(callback);
    }
    Poll.showPoll = function(id, callback) {
      $http.get('/polls/' + id).then(callback);
    }
    Poll.vote = function(id, option, callback) {
      $http.post('/polls/' + id + '/vote', option).then(callback);
    }
    return Poll;
  }