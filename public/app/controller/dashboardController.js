(() => {
	'use strict';
	angular
		.module('chat')
		.controller('dashboardController', dashboardController);
	dashboardController.$inject = ['$scope', 'DataBaseService', '$log', '$mdToast', '$state'];
	function dashboardController($scope, DataBase, $log, $mdToast, $state) {
		$scope.currentNavItem = 'Chat';
		$scope.logout = () => {
			sessionStorage.clear();
			$state.go('index');
		};
		if (!sessionStorage.getItem("date")) {
			$state.go('index');
		} else {
			$scope.date = JSON.parse(sessionStorage.getItem('date'));
			$scope.mensaje = $scope.date[0].apodo;
		}
	}
})();