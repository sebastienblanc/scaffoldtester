'use strict';

function SearchCustomerController($scope,$filter,dataService) {
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
    var customerPipe = dataService.customerPipe;
    var customerStore = dataService.customerStore;

	$scope.performSearch = function() {
        customerPipe.read({
            complete: function(data){
                customerStore.save(data,true);
                $scope.searchResults = customerStore.read();
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

function NewCustomerController($scope,$location,dataService) {
    var customerPipe = dataService.customerPipe;
    $scope.disabled = false;


    $scope.save = function() {
        customerPipe.save($scope.customer,{
            complete: function(data){
                $location.path('/Customers');
                $scope.$apply();
            }
        });
    };
	
    $scope.cancel = function() {
        $location.path("/Customers");
    };
}

function EditCustomerController($scope,$routeParams,$location,dataService) {
	var self = this;
	$scope.disabled = false;
    var customerPipe = dataService.customerPipe;

	$scope.get = function() {
        customerPipe.read({
            id: $routeParams.CustomerId,
            success: function(data){
                self.original = data;
                $scope.customer = JSON.parse(JSON.stringify(data));

                $scope.$apply();
            }
        });
    };

	$scope.isClean = function() {
		return angular.equals(self.original, $scope.customer);
	};

	$scope.save = function() {
        customerPipe.save($scope.customer,{
            complete: function(data){
                $location.path('/Customers');
                $scope.$apply();
            }
        });
	};

	$scope.cancel = function() {
		$location.path("/Customers");
	};

	$scope.remove = function() {
        customerPipe.remove($scope.customer,{
            success: function(data){
                $location.path('/Customers');
                $scope.$apply();
            }
        });
	};
	
	$scope.get();
};