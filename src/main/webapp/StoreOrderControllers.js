'use strict';

function SearchStoreOrderController($scope,$filter,dataService) {
    $scope.filter = $filter;
	$scope.search={};
	$scope.currentPage = 0;
	$scope.pageSize= 10;
	$scope.searchResults = [];
	$scope.pageRange = [];
	$scope.numberOfPages = function() {
		var result = Math.ceil($scope.searchResults.length/$scope.pageSize);
		return (result == 0) ? 1 : result;
	};
    var storeOrderPipe = dataService.storeOrderPipe;
    var storeOrderStore = dataService.storeOrderStore;
    var customerPipe = dataService.customerPipe;
    customerPipe.read({
        success: function(data){
            $scope.customerList = data;
            $scope.$apply();
        }
    });
    var discountVoucherPipe = dataService.discountVoucherPipe;
    discountVoucherPipe.read({
        success: function(data){
            $scope.voucherList = data;
            $scope.$apply();
        }
    });

	$scope.performSearch = function() {
        storeOrderPipe.read({
            complete: function(data){
                storeOrderStore.save(data,true);
                $scope.searchResults = storeOrderStore.read();
                var max = $scope.numberOfPages();
                $scope.pageRange = [];
                for(var ctr=0;ctr<max;ctr++) {
                    $scope.pageRange.push(ctr);
                }
                $scope.$apply();
            }
        });
    };
	
	$scope.previous = function() {
	   if($scope.currentPage > 0) {
	       $scope.currentPage--;
	   }
	};
	
	$scope.next = function() {
	   if($scope.currentPage < ($scope.numberOfPages() - 1) ) {
	       $scope.currentPage++;
       }
	};
	
	$scope.setPage = function(n) {
	   $scope.currentPage = n;
	};

    $scope.filterSearchResults = function(result) {
        var flag = true;
        for(var key in $scope.search){
            if($scope.search.hasOwnProperty(key)) {
                var expected = $scope.search[key];
                if(expected == null || expected === "") {
                    continue;
                }
                var actual = result[key];
                if(angular.isObject(expected)) {
                    flag = flag && angular.equals(expected,actual);
                }
                else {
                    flag = flag && (actual.toString().indexOf(expected.toString()) != -1);
                }
                if(flag === false) {
                    return false;
                }
            }
        }
        return true;
    };

	$scope.performSearch();
};

function NewStoreOrderController($scope,$location,dataService) {
    var storeOrderPipe = dataService.storeOrderPipe;
    $scope.disabled = false;

        var customerPipe = dataService.customerPipe;
        customerPipe.read({
            success: function(data){
                $scope.customerList = data;
                $scope.$apply();
            }
        });
        var discountVoucherPipe = dataService.discountVoucherPipe;
        discountVoucherPipe.read({
            success: function(data){
                $scope.voucherList = data;
                $scope.$apply();
            }
        });

    $scope.save = function() {
        storeOrderPipe.save($scope.storeOrder,{
            complete: function(data){
                $location.path('/StoreOrders');
                $scope.$apply();
            }
        });
    };
	
    $scope.cancel = function() {
        $location.path("/StoreOrders");
    };
}

function EditStoreOrderController($scope,$routeParams,$location,dataService) {
	var self = this;
	$scope.disabled = false;
    var storeOrderPipe = dataService.storeOrderPipe;
    var customerPipe = dataService.customerPipe;
    var discountVoucherPipe = dataService.discountVoucherPipe;

	$scope.get = function() {
        storeOrderPipe.read({
            id: $routeParams.StoreOrderId,
            success: function(data){
                self.original = data;
                $scope.storeOrder = JSON.parse(JSON.stringify(data));
                 customerPipe.read({
                    success: function(data){
                        $scope.customerList = data;
                        angular.forEach($scope.customerList, function(datum){
                        if(angular.equals(datum,$scope.storeOrder.customer)) {
                            $scope.storeOrder.customer = datum;
                            self.original.customer = datum;
                        }
                        });
                        $scope.$apply();
                    }
                });
                 discountVoucherPipe.read({
                    success: function(data){
                        $scope.voucherList = data;
                        angular.forEach($scope.voucherList, function(datum){
                        if(angular.equals(datum,$scope.storeOrder.voucher)) {
                            $scope.storeOrder.voucher = datum;
                            self.original.voucher = datum;
                        }
                        });
                        $scope.$apply();
                    }
                });

                $scope.$apply();
            }
        });
    };

	$scope.isClean = function() {
		return angular.equals(self.original, $scope.storeOrder);
	};

	$scope.save = function() {
        storeOrderPipe.save($scope.storeOrder,{
            complete: function(data){
                $location.path('/StoreOrders');
                $scope.$apply();
            }
        });
	};

	$scope.cancel = function() {
		$location.path("/StoreOrders");
	};

	$scope.remove = function() {
        storeOrderPipe.remove($scope.storeOrder,{
            success: function(data){
                $location.path('/StoreOrders');
                $scope.$apply();
            }
        });
	};
	
	$scope.get();
};