'use strict';

angular.module('Customer',['ngResource']).
    factory('CustomerResource', function($resource
    ){
        var customer = $resource('rest/customers/:CustomerId',{CustomerId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
        
        
        return customer;
    });