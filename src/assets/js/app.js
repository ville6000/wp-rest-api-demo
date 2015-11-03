/*global angular: true */
(function () {
    "use strict";

    angular
        .module('restApiDemo', ['ngSanitize', 'ngRoute', 'angularMoment'])
        .config(configure)
        .constant('REST_API_PATH', 'http://dev.viklund.fi/wp/wp-json/wp/v2/');

    function configure($routeProvider) {
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
    }
})();