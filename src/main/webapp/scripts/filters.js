'use strict';

angular.module('scaffoldtester.filters',[]).filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
});