/*global angular: true */
(function () {
    "use strict";

    var wpRestAPIPath = 'http://yourdomain.to/wp-json/wp/v2/';
    var app = angular.module('restApiDemo', ['ngSanitize', 'ngRoute']);

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'assets/templates/post-list.html',
                controller:  'PostsListController'
            })
            .when('/:id', {
                templateUrl: 'assets/templates/single-post.html',
                controller:  'PostController'
            })
            .otherwise('/');
    });

    /**
     * Controller for single post
     *
     * @param $scope
     * @param $routeParams
     * @param PostService
     * @constructor
     */
    function PostController($scope, $routeParams, PostService) {
        PostService.getPostById($routeParams.id).success(function (response) {
            $scope.post = response;
        });
    }

    app.controller('PostController', ['$scope', '$routeParams', 'PostService', PostController]);

    /***
     * Controller for post list
     *
     * @param $scope
     * @param PostService
     * @constructor
     */
    function PostsListController($scope, PostService) {
        PostService.getPosts().success(function (response) {
            $scope.posts = response;
        });
    }

    app.controller('PostsListController', ['$scope', 'PostService', PostsListController]);

    /**
     * Service for posts
     *
     * @param $http
     * @param wpRestAPIPath
     * @returns {{}}
     * @constructor
     */
    function PostService($http, wpRestAPIPath) {
        var API = {};

        API.getPosts = function () {
            return $http({
                method: 'GET',
                url:    wpRestAPIPath + 'posts',
                cache:  true
            });
        };

        API.getPostById = function (id) {
            return $http({
                method: 'GET',
                url:    wpRestAPIPath + 'posts/' + id,
                cache:  true
            });
        };

        return API;
    }

    app.factory('PostService', function ($http) {
        return PostService($http, wpRestAPIPath);
    });
})();