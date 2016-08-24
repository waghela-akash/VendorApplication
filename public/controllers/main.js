angular.module('itemController', [])

	.controller('mainController', ['$scope','$http','Items', function($scope, $http, Items) {
		$scope.formData = {};
		$scope.loading = true;

		Items.get()
			.success(function(data) {
				$scope.items = data;
				$scope.loading = false;
			});

		$scope.createItem = function() {

			if ($scope.formData.name != undefined) {
				$scope.loading = true;
				Items.create($scope.formData).success(function(data) {
						$scope.items = data;
						$scope.formData = {};						
						$scope.loading = false;
						
					});
			}
		};

		$scope.updateItem = function(id) {
			$scope.loading = true;

			if ($scope.formData1.name != undefined) {
				$scope.loading = true;

				Items.create($scope.formData1)
					.success(function(data) {
						$scope.formData1 = {}; 
					});
				Items.delete(id)
				.success(function(data) {
					$scope.items = data;
					$scope.loading = false;					
				});
			}

			
			/*
			var query = {'_id' : id};
			Items.findOne(query, function(err, data) {
					$scope.loading = false;
					data.name = $scope.formData.name;
					data.cost = $scope.formData.cost;
					data.quantity = $scope.formData.quantity;
					data.save();
					//$scope.items = data;
				});
			*/
		};	

		$scope.deleteItem = function(id) {
			$scope.loading = true;

			Items.delete(id)
				.success(function(data) {
					$scope.items = data;
					$scope.loading = false;					
				});
		};

			

	}]);