(function () {
   'use strict';

    angular
        .module('restApiDemo')
        .controller('PostController', ['$scope', '$routeParams', 'PostService', PostController]);

    function PostController($scope, $routeParams, PostService) {
        PostService.getPostById($routeParams.id).success(function (response) {
            $scope.post = response;
        });
    }
})();