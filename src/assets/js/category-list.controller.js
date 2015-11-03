(function () {
    'use strict';

    angular
        .module('restApiDemo')
        .controller('CategoryListController', ['$scope', 'TermService', CategoryListController]);

    function CategoryListController($scope, TermService) {
        TermService.getCategories().then(function (response) {
            $scope.items = response.data;
        });
    }
})();