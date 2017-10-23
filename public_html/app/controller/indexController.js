(() => {
    'use strict';
    angular
        .module('chat')
        .controller('indexController', indexController);
    indexController.$inject = ['$scope', 'DataBaseService', '$log', '$mdToast', '$state'];
    function indexController($scope, DataBase, $log, $mdToast, $state) {

        $scope.currentNavItem = 'login';
        $scope.logi = true;
        $scope.regiter = !true;
        $scope.goto = function (page) {
            $scope.logi = true;
            $scope.regiter = !true;
        };
        $scope.goto2 = function (page) {
            $scope.logi = !true;
            $scope.regiter = true;
        };
        $scope.reg = {};
        $scope.confpass;
        $scope.mensaje = '';
        $scope.register = () => {
            if ($scope.reg.pass !== $scope.confpass) {
                var pinTo = $scope.getToastPosition();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Las contraseñas deben ser iguales')
                        .position(pinTo)
                        .hideDelay(3000)
                );
            } else {
                DataBase.registe($scope.reg)
                    .then(function successCallback(response) {
                        var x = 0;
                        if (!response.data.next) {
                            $scope.mensaje = response.data.mensaje;
                            x++;
                        }
                        if (x===0) {
                            $scope.mensaje = "Registrado correctamente";
                            $scope.currentNavItem = 'login';
                            $scope.login = true;
                            $scope.regiter = !true;
                            $scope.reg = {};
                        }
                        var pinTo = $scope.getToastPosition();
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent($scope.mensaje)
                                .position(pinTo)
                                .hideDelay(3000)
                        );

                    }, function errorCallback(response) {
                        $log.error(response);
                    });
            }
        };
        if (!sessionStorage.getItem('date')) {
            var last = {
                top: true,
                right: true
            };
            $scope.toastPosition = angular.extend({}, last);
            $scope.getToastPosition = function () {
                sanitizePosition();

                return Object.keys($scope.toastPosition)
                    .filter(function (pos) { return $scope.toastPosition[pos]; })
                    .join(' ');
            };

            function sanitizePosition() {
                var current = $scope.toastPosition;

                if (current.bottom && last.top) current.top = false;
                if (current.left && last.right) current.right = false;

                last = angular.extend({}, current);
            }


            $scope.data = {};
            $scope.mensaje = '';
            $scope.login = () => {
                DataBase.login($scope.data).then(function successCallback(response) {
                    if (response.data.rows.length > 0) {
                        $scope.mensaje = "logueado correctamente";
                        $scope.date = {
                            response.data.rows.nombre,
                            response.dara.rows.email,
                            response.data.rows.apodo
                                      };
                        sessionStorage.setItem('date', JSON.stringify($scope.date));
                        $state.go('dashboard');
                    } else {
                        $scope.mensaje = "Email y/o Contraseña incorrectos";
                    }
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent($scope.mensaje)
                            .position(pinTo)
                            .hideDelay(3000)
                    );
                    $scope.data = {};
                }, function errorCallback(response) {
                    $log.error(response);
                });
            };
        } else {
            $state.go('dashboard');
        }
    }
})();
