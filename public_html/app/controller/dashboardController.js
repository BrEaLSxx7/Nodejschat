(() => {
	'use strict';
	angular
		.module('chat')
		.controller('dashboardController', dashboardController);
	dashboardController.$inject = ['$scope', 'DataBaseService', '$log', '$mdToast', '$state'];
	function dashboardController($scope, DataBase, $log, $mdToast, $state) {
		var socket = io.connect('https://brealsxx.herokuapp.com/', { 'forcenew': true });
		$scope.currentNavItem = 'Chat';
		$scope.logout = () => {
			sessionStorage.clear();
			$state.go('index');
		};
		if (!sessionStorage.getItem("date")) {
			$state.go('index');
		} else {
			$scope.date = JSON.parse(sessionStorage.getItem('date'));
			$scope.mensaje = $scope.date.apodo;
		}
	}
})();