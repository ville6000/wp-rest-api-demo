(function () {
   'use strict';

    angular
        .module('restApiDemo')
        .controller('PostsListController', ['$scope', 'PostService', PostsListController]);

    function PostsListController($scope, PostService) {
        PostService.getPosts().then(function (response) {
            $scope.posts = response.data;
        });
    }
})();
