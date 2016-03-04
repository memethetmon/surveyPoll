app.controller("UserController", function($scope, UserFactory, $location, $routeParams){

  $scope.currentUser = UserFactory.getCurrentUser();

  if(!$scope.currentUser){
    $location.path('/');
  }

  $scope.loginUser = function(user){
    // $scope.currentUser = null;

    UserFactory.login(user, function(data){
      $location.path('/dashboard');
    })
  }
  
  $scope.logout = function() {
    UserFactory.logout(function() {
      $location.path('/');
    })
  }
})

app.factory("UserFactory", function($http) {
  var currentUser = null;

  return {

    getCurrentUser: function() {
      return currentUser;
    },
    logout: function(callback) {
      currentUser = null;
      callback();
    },
    login: function(user, callback) {
      $http.post('/user', user).then(function(response) {
        currentUser = response.data;
        callback(response);
      });
    }
  }
})