(function () {
    'use strict';

    angular
        .module('restApiDemo')
        .controller('CategoryPostsController', ['$scope', '$routeParams', 'PostService', CategoryPostsController]);

    function CategoryPostsController($scope, $routeParams, PostService) {
        PostService.getPostsByCategory($routeParams.slug).then(function (response) {
            $scope.posts = response.data;
        });
    }
})();