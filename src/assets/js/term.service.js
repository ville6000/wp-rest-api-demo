(function () {
    'use strict';

    angular.module('restApiDemo').factory('TermService', ['$http', 'REST_API_PATH', function ($http, REST_API_PATH) {
        return TermService($http, REST_API_PATH);
    }]);

    function TermService($http, REST_API_PATH) {
        var API = {};

        API.getCategories = function () {
            return $http({
                method: 'GET',
                url:    REST_API_PATH + 'terms/category',
                cache:  true
            });
        };

        return API;
    }
})();