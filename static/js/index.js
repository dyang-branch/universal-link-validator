var app = angular.module('UniversalLinkValidator', ['MainController']);

app.config(function($locationProvider) {
	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
	});
});