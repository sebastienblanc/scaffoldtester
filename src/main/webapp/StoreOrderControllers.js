'use strict';

function SearchStoreOrderController($scope,$filter,$http,StoreOrderResource
,CustomerResource
,DiscountVoucherResource
) {
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
    $scope.customerList = CustomerResource.queryAll();
    $scope.voucherList = DiscountVoucherResource.queryAll();

	$scope.performSearch = function() {
		$scope.searchResults = StoreOrderResource.queryAll(function(){
            var max = $scope.numberOfPages();
            $scope.pageRange = [];
            for(var ctr=0;ctr<max;ctr++) {
                $scope.pageRange.push(ctr);
            }
		});
		/*$http.post('rest/StoreOrders/search',$scope.search).success(function(data,status){
			$scope.searchResults = data;
		});*/
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

function NewStoreOrderController($scope,$location,StoreOrderResource
, CustomerResource
, DiscountVoucherResource
) {
	$scope.disabled = false;
	
	CustomerResource.queryAll(function(data){
        $scope.customerList = angular.fromJson(JSON.stringify(data));
    });
	DiscountVoucherResource.queryAll(function(data){
        $scope.voucherList = angular.fromJson(JSON.stringify(data));
    });

	$scope.save = function() {
		StoreOrderResource.save($scope.storeorder, function(storeorder,responseHeaders){
			// Get the Location header and parse it.
			var locationHeader = responseHeaders('Location');
			var fragments = locationHeader.split('/');
			var id = fragments[fragments.length -1];
			$location.path('/StoreOrders/edit/' + id);
		});
	};
	
    $scope.cancel = function() {
        $location.path("/StoreOrders");
    };
}

function EditStoreOrderController($scope,$routeParams,$location,StoreOrderResource
, CustomerResource
, DiscountVoucherResource
) {
	var self = this;
	$scope.disabled = false;

	$scope.get = function() {
	    StoreOrderResource.get({StoreOrderId:$routeParams.StoreOrderId}, function(data){
            self.original = data;
            $scope.storeorder = new StoreOrderResource(self.original);
            CustomerResource.queryAll(function(data) {
                $scope.customerList = data;
                angular.forEach($scope.customerList, function(datum){
                    if(angular.equals(datum,$scope.storeorder.customer)) {
                        $scope.storeorder.customer = datum;
                        self.original.customer = datum;
                    }
                });
            });
            DiscountVoucherResource.queryAll(function(data) {
                $scope.voucherList = data;
                angular.forEach($scope.voucherList, function(datum){
                    if(angular.equals(datum,$scope.storeorder.voucher)) {
                        $scope.storeorder.voucher = datum;
                        self.original.voucher = datum;
                    }
                });
            });
        });
	};

	$scope.isClean = function() {
		return angular.equals(self.original, $scope.storeorder);
	};

	$scope.save = function() {
		$scope.storeorder.$update(function(){
            $scope.get();
		});
	};

	$scope.cancel = function() {
		$location.path("/StoreOrders");
	};

	$scope.remove = function() {
		$scope.storeorder.$remove(function() {
			$location.path("/StoreOrders");
		});
	};
	
	$scope.get();
};