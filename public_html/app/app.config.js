(() => {
    'use strict';

    angular.module('chat').constant('host', 'https://brealsxx.herokuapp.com/');

    angular
        .module('chat')
        .config(config);

    config.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider'];
    function config($httpProvider, $stateProvider, $urlRouterProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers.delete = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('index', {
                url: '/',
                controller: 'indexController',
                templateUrl: 'app/view/inicio.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            files: ['app/controller/indexController.js']
                        }]);
                    }]
                }
            }).state('dashboard', {
                url: '/dashboard',
                controller: 'dashboardController',
                templateUrl: 'app/view/dashboard.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            files: ['app/controller/dashboardController.js']
                        }]);
                    }]
                }
            });
    }

})();
