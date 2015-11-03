(function () {
   'use strict';

    angular
        .module('restApiDemo')
        .controller('SearchFormController', ['$scope', '$location', SearchFormController]);

    function SearchFormController($scope, $location) {
        this.search = function () {
            var searchTerm = $scope.searchTerm;

            if (searchTerm !== "") {
                $location.path('/search/' + searchTerm);
            }
        }
    }
})();