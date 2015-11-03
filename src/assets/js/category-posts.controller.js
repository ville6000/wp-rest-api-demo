(function () {
    'use strict';

    angular
        .module('restApiDemo')
        .controller('CategoryPostsController', ['$scope', '$routeParams', 'PostService', CategoryPostsController]);

    function CategoryPostsController($scope, $routeParams, PostService) {
        $scope.posts = [];
        $scope.searchMade = false;
        $scope.resultCount = 0;

        $scope.$watch('posts', function () {
            $scope.postCount = $scope.posts.length;
            $scope.searchMade = true;
        }, true);

        PostService.getPostsByCategory($routeParams.slug).then(function (response) {
            $scope.posts = response.data;
        });
    }
})();