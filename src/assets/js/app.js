/*global angular: true */
(function () {
    "use strict";

    var wpRestAPIPath = 'http://dev.viklund.fi/wp/wp-json/wp/v2/';
    var app = angular.module('restApiDemo', ['ngSanitize', 'ngRoute', 'angularMoment']);

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl:  'assets/templates/post-list.html',
                controller:   'PostsListController',
                controllerAs: 'PostListCtrl'
            })
            .when('/post/:id', {
                templateUrl: 'assets/templates/single-post.html',
                controller:  'PostController'
            })
            .when('/search/:s', {
                templateUrl:  'assets/templates/post-list.html',
                controller:   'PostsSearchController',
                controllerAs: 'PostSearchCtrl'
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

    function PostsSearchController($scope, $routeParams, PostService) {
        $scope.posts = [];
        $scope.searchMade = false;
        $scope.resultCount = 0;

        $scope.$watch('posts', function () {
            $scope.postCount = $scope.posts.length;
            $scope.searchMade = true;
        }, true);

        PostService.searchPosts($routeParams.s).success(function (response) {
            $scope.posts = response;
        });
    }

    app.controller('PostsSearchController', ['$scope', '$routeParams', 'PostService', PostsSearchController]);

    function SearchFormController($scope, $location) {
        this.search = function () {
            var searchTerm = $scope.searchTerm;

            if (searchTerm !== "") {
                $location.path('/search/' + searchTerm);
            }
        }
    }

    app.controller('SearchFormController', ['$scope', '$location', SearchFormController]);

    function CategoryListController($scope, TermService) {
        TermService.getCategories().success(function (response) {
            $scope.items = response;
        });
    }

    app.controller('CategoryListController', ['$scope', 'TermService', CategoryListController]);

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

        API.searchPosts = function (term) {
            return $http({
                method: 'GET',
                url:    wpRestAPIPath + 'posts?filter[s]=' + term,
                cache:  true
            });
        };

        return API;
    }

    app.factory('PostService', function ($http) {
        return PostService($http, wpRestAPIPath);
    });

    function TermService($http, wpRestAPIPath) {
        var API = {};

        API.getCategories = function () {
            return $http({
                method: 'GET',
                url:    wpRestAPIPath + 'terms/category',
                cache:  true
            });
        };

        return API;
    }

    app.factory('TermService', function ($http) {
        return TermService($http, wpRestAPIPath);
    });
})();