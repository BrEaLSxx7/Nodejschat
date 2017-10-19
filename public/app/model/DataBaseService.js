(() => {
    'use strict';
    angular
        .module('chat')
        .service('DataBaseService', DataBaseService);
    DataBaseService.$inject = ['$http','host', '$httpParamSerializerJQLike'];
    function DataBaseService($http,host, $httpParamSerializerJQLike) {

        this.login = function (data) {
            return $http.get(host + data.email + '/' + data.pass);
        };
        this.registe = function (reg) {
            return $http.post(host, $httpParamSerializerJQLike(reg));
        };
    }

})();