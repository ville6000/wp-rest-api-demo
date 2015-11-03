(function () {
   'use strict';

    angular
        .module('restApiDemo')
        .controller('PostsSearchController', ['$scope', '$routeParams', 'PostService', PostsSearchController]);

    function PostsSearchController($scope, $routeParams, PostService) {
        $scope.posts = [];
        $scope.searchMade = false;
        $scope.resultCount = 0;

        $scope.$watch('posts', function () {
            $scope.postCount = $scope.posts.length;
            $scope.searchMade = true;
        }, true);

        if (typeof $routeParams.s !== 'undefined') {
            PostService.searchPosts($routeParams.s).success(function (response) {
                $scope.posts = response;
            });
        } else if (typeof $routeParams.slug !== 'undefined') {
            PostService.getPostsByCategory($routeParams.slug).success(function (response) {
                $scope.posts = response;
            });
        }
    }
})();