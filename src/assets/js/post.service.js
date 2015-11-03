(function () {
    'use strict';

    angular.module('restApiDemo').factory('PostService', ['$http', 'REST_API_PATH', function ($http, REST_API_PATH) {
        return PostService($http, REST_API_PATH);
    }]);

    function PostService($http, REST_API_PATH) {
        var API = {};

        API.getPosts = function () {
            return $http({
                method: 'GET',
                url:    REST_API_PATH + 'posts',
                cache:  true
            });
        };

        API.getPostById = function (id) {
            return $http({
                method: 'GET',
                url:    REST_API_PATH + 'posts/' + id,
                cache:  true
            });
        };

        API.searchPosts = function (term) {
            return $http({
                method: 'GET',
                url:    REST_API_PATH + 'posts?filter[s]=' + term,
                cache:  true
            });
        };

        return API;
    }
})();
