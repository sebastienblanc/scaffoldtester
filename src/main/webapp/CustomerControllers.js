'use strict';

function SearchCustomerController($scope,$filter,$http,dataService,CustomerResource
) {
    $scope.filter = $filter;
	$scope.search={};
	$scope.currentPage = 0;
	$scope.pageSize= 10;
	$scope.searchResults = [];
	$scope.pageRange = [];
	var customerPipe = dataService.customerPipe; 
	$scope.numberOfPages = function() {
		var result = Math.ceil($scope.searchResults.length/$scope.pageSize);
		return (result == 0) ? 1 : result;
	};

	$scope.performSearch = function() {

		$scope.searchResults = customerPipe.read({
			complete: function(data){
				var max = $scope.numberOfPages();
	            $scope.pageRange = [];
	            for(var ctr=0;ctr<max;ctr++) {
	                $scope.pageRange.push(ctr);
	            	}
	            
            }

		});
	};
	/*$scope.performSearch = function() {
		$scope.searchResults = CustomerResource.queryAll(function(){
            var max = $scope.numberOfPages();
            $scope.pageRange = [];
            for(var ctr=0;ctr<max;ctr++) {
                $scope.pageRange.push(ctr);
            }
		});
	};*/
	
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

function NewCustomerController($scope,$location,dataService
) {
	var customerPipe = dataService.customerPipe; 
	$scope.disabled = false;
	

	$scope.save = function() {

		customerPipe.save($scope.customer);
	/*
		CustomerResource.save($scope.customer, function(customer,responseHeaders){
			// Get the Location header and parse it.
			var locationHeader = responseHeaders('Location');
			var fragments = locationHeader.split('/');
			var id = fragments[fragments.length -1];
			$location.path('/Customers/edit/' + id);
		});
	*/
	};
	
    $scope.cancel = function() {
        $location.path("/Customers");
    };
}

function EditCustomerController($scope,$routeParams,$location,dataService,CustomerResource
) {
	var self = this;
	$scope.disabled = false;
	var customerPipe = dataService.customerPipe; 
	var customerStore = dataService.customerStore;
	$scope.get = function() {
		customerPipe.read({
			id: $routeParams.CustomerId,
			success: function(data){
				self.original = data;
				customerStore.save(data);
				var customer = JSON.parse(JSON.stringify(customerStore.read(parseInt($routeParams.CustomerId))[0]));
				$scope.customer = customer;
		        $scope.$apply();
			}
		});
	};
	/*$scope.get = function() {
	    CustomerResource.get({CustomerId:$routeParams.CustomerId}, function(data){
            self.original = data;
            $scope.customer = new CustomerResource(self.original);
        });
	};*/

	$scope.isClean = function() {
		return angular.equals(self.original, $scope.customer);
	};

	$scope.save = function() {
		customerPipe.save($scope.customer);
	};

	$scope.cancel = function() {
		$location.path("/Customers");
	};

	$scope.remove = function() {
		$scope.customer.$remove(function() {
			$location.path("/Customers");
		});
	};
	
	$scope.get();
};