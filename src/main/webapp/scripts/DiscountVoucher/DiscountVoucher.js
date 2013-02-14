'use strict';

angular.module('DiscountVoucher',['ngResource']).
    factory('DiscountVoucherResource', function($resource
    ){
        var discountvoucher = $resource('rest/discountvouchers/:DiscountVoucherId',{DiscountVoucherId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
        
        
        return discountvoucher;
    });