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

        PostService.searchPosts($routeParams.s).success(function (response) {
            $scope.posts = response;
        });
    }
})();
