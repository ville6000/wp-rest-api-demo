(function () {
    'use strict';

    angular.module('restApiDemo').factory('TermService', ['$http', 'REST_API_PATH', function ($http, REST_API_PATH) {
        return TermService($http, REST_API_PATH);
    }]);

    function TermService($http, REST_API_PATH) {
        var API = {};

        API.getCategories = function () {
            return $http({
                method: 'GET',
                url:    REST_API_PATH + 'terms/category',
                cache:  true
            });
        };

        /**
         * Make parent - child tree from terms
         *
         * @param {Array} terms
         * @param {int} parent
         * @returns {{}}
         */
        API.makeTree = function (terms, parent) {
            var node = {},
                children;

            terms
                .filter(function (t) {
                    return t.parent === parent
                })
                .forEach(function (t) {
                    children = API.makeTree(terms, t.id);
                    t['children'] = (Object.keys(children).length > 0) ? children : false;
                    node[t.id] = t;
                });

            return node;
        };

        return API;
    }
})();