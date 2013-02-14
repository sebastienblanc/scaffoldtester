'use strict';

var scaffoldtester = angular.module('scaffoldtester', ['scaffoldtester.filters'
,'Customer'
,'DiscountVoucher'
,'StoreOrder'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/Customers',{templateUrl:'partials/Customer/search.html',controller:SearchCustomerController})
      .when('/Customers/new',{templateUrl:'partials/Customer/detail.html',controller:NewCustomerController})
      .when('/Customers/edit/:CustomerId',{templateUrl:'partials/Customer/detail.html',controller:EditCustomerController})
      .when('/DiscountVouchers',{templateUrl:'partials/DiscountVoucher/search.html',controller:SearchDiscountVoucherController})
      .when('/DiscountVouchers/new',{templateUrl:'partials/DiscountVoucher/detail.html',controller:NewDiscountVoucherController})
      .when('/DiscountVouchers/edit/:DiscountVoucherId',{templateUrl:'partials/DiscountVoucher/detail.html',controller:EditDiscountVoucherController})
      .when('/StoreOrders',{templateUrl:'partials/StoreOrder/search.html',controller:SearchStoreOrderController})
      .when('/StoreOrders/new',{templateUrl:'partials/StoreOrder/detail.html',controller:NewStoreOrderController})
      .when('/StoreOrders/edit/:StoreOrderId',{templateUrl:'partials/StoreOrder/detail.html',controller:EditStoreOrderController})
      .otherwise({
        redirectTo: '/'
      });
  }]);
