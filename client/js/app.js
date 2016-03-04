var app = angular.module('app', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
		.when("/", {
			templateUrl: "/partials/login.html",
			controller: "UserController"
		})
		.when("/dashboard", {
			templateUrl: "/partials/pollLists.html",
			controller: "PollsController"
		})
		.when("/create", {
			templateUrl: "/partials/createPoll.html",
			controller: "PollsController"
		})
		.when("/poll/:id", {
			templateUrl: "/partials/showPoll.html",
			controller: "PollsController"
		})
		.otherwise('/')
	})