(function () {
   'use strict';

    angular
        .module('restApiDemo')
        .controller('PostsListController', ['$scope', 'PostService', PostsListController]);

    function PostsListController($scope, PostService) {
        PostService.getPosts().success(function (response) {
            $scope.posts = response;
        });
    }
})();
