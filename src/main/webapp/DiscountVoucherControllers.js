'use strict';

function SearchDiscountVoucherController($scope,$filter,dataService) {
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
    var discountVoucherPipe = dataService.discountVoucherPipe;
    var discountVoucherStore = dataService.discountVoucherStore;

	$scope.performSearch = function() {
        discountVoucherPipe.read({
            complete: function(data){
                discountVoucherStore.save(data,true);
                $scope.searchResults = discountVoucherStore.read();
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

function NewDiscountVoucherController($scope,$location,dataService) {
    var discountVoucherPipe = dataService.discountVoucherPipe;
    $scope.disabled = false;


    $scope.save = function() {
        discountVoucherPipe.save($scope.discountVoucher,{
            complete: function(data){
                $location.path('/DiscountVouchers');
                $scope.$apply();
            }
        });
    };
	
    $scope.cancel = function() {
        $location.path("/DiscountVouchers");
    };
}

function EditDiscountVoucherController($scope,$routeParams,$location,dataService) {
	var self = this;
	$scope.disabled = false;
    var discountVoucherPipe = dataService.discountVoucherPipe;

	$scope.get = function() {
        discountVoucherPipe.read({
            id: $routeParams.DiscountVoucherId,
            success: function(data){
                self.original = data;
                $scope.discountVoucher = JSON.parse(JSON.stringify(data));

                $scope.$apply();
            }
        });
    };

	$scope.isClean = function() {
		return angular.equals(self.original, $scope.discountVoucher);
	};

	$scope.save = function() {
        discountVoucherPipe.save($scope.discountVoucher,{
            complete: function(data){
                $location.path('/DiscountVouchers');
                $scope.$apply();
            }
        });
	};

	$scope.cancel = function() {
		$location.path("/DiscountVouchers");
	};

	$scope.remove = function() {
        discountVoucherPipe.remove($scope.discountVoucher,{
            success: function(data){
                $location.path('/DiscountVouchers');
                $scope.$apply();
            }
        });
	};
	
	$scope.get();
};