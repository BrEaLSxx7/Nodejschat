(() => {
	'use strict';
	angular
		.module('chat')
		.controller('dashboardController', dashboardController);
	dashboardController.$inject = ['$scope', 'DataBaseService', '$log', '$mdToast', '$state'];
	function dashboardController($scope, DataBase, $log, $mdToast, $state) {
		$scope.currentNavItem = 'Chat';
		$scope.logout = () => {
			localStorage.clear();
			$state.go('index');
		};
		if (!localStorage.getItem("date")) {
			$state.go('index');
		} else {
			$scope.date = JSON.parse(localStorage.getItem('date'));
			$scope.mensaje = $scope.date.apodo;
		}
	}
})();
