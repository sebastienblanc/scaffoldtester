'use strict';

function SearchDiscountVoucherController($scope,$filter,$http,DiscountVoucherResource
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

	$scope.performSearch = function() {
		$scope.searchResults = DiscountVoucherResource.queryAll(function(){
            var max = $scope.numberOfPages();
            $scope.pageRange = [];
            for(var ctr=0;ctr<max;ctr++) {
                $scope.pageRange.push(ctr);
            }
		});
		/*$http.post('rest/DiscountVouchers/search',$scope.search).success(function(data,status){
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

function NewDiscountVoucherController($scope,$location,DiscountVoucherResource
) {
	$scope.disabled = false;
	

	$scope.save = function() {
		DiscountVoucherResource.save($scope.discountvoucher, function(discountvoucher,responseHeaders){
			// Get the Location header and parse it.
			var locationHeader = responseHeaders('Location');
			var fragments = locationHeader.split('/');
			var id = fragments[fragments.length -1];
			$location.path('/DiscountVouchers/edit/' + id);
		});
	};
	
    $scope.cancel = function() {
        $location.path("/DiscountVouchers");
    };
}

function EditDiscountVoucherController($scope,$routeParams,$location,DiscountVoucherResource
) {
	var self = this;
	$scope.disabled = false;

	$scope.get = function() {
	    DiscountVoucherResource.get({DiscountVoucherId:$routeParams.DiscountVoucherId}, function(data){
            self.original = data;
            $scope.discountvoucher = new DiscountVoucherResource(self.original);
        });
	};

	$scope.isClean = function() {
		return angular.equals(self.original, $scope.discountvoucher);
	};

	$scope.save = function() {
		$scope.discountvoucher.$update(function(){
            $scope.get();
		});
	};

	$scope.cancel = function() {
		$location.path("/DiscountVouchers");
	};

	$scope.remove = function() {
		$scope.discountvoucher.$remove(function() {
			$location.path("/DiscountVouchers");
		});
	};
	
	$scope.get();
};