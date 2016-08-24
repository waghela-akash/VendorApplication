angular.module('itemController', [])

	// inject the Item service factory into our controller
	.controller('mainController', ['$scope','$http','Items', function($scope, $http, Items) {
		$scope.formData = {};
		$scope.loading = true;

		Items.get()
			.success(function(data) {
				$scope.items = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createItem = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Items.create($scope.formData)

					// if successful creation, call our get function to get all the new items
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.items = data; // assign our new list of items
					});
			}
		};

		// DELETE ==================================================================
		// delete an item after checking it
		$scope.deleteItem = function(id) {
			$scope.loading = true;

			Items.delete(id)
				.success(function(data) {
					$scope.items = data;
					$scope.loading = false;					
				});
		};

		// UPDATE ==================================================================
		// update an item after checking it
		$scope.updateItem = function(id) {
			$scope.loading = true;

			if ($scope.formData.name != undefined) {
				$scope.loading = true;

				Items.create($scope.formData)
					.success(function(data) {
						$scope.formData = {}; 
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

	}]);