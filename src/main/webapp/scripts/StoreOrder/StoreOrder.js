'use strict';

angular.module('StoreOrder',['ngResource']).
    factory('StoreOrderResource', function($resource
    , CustomerResource
    , DiscountVoucherResource
    ){
        var storeorder = $resource('rest/storeorders/:StoreOrderId',{StoreOrderId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
        
        storeorder.prototype.getCustomer = function(cb) {
            var resource = CustomerResource.query({customerId:this.customer.id},cb);
            return resource;
        };
        storeorder.prototype.getVoucher = function(cb) {
            var resource = DiscountVoucherResource.query({voucherId:this.voucher.id},cb);
            return resource;
        };
        
        return storeorder;
    });