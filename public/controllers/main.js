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
		// delete a item after checking it
		$scope.deleteItem = function(id) {
			$scope.loading = true;

			Items.delete(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.items = data;
				});
		};

		// UPDATE ==================================================================
		// update a item after checking it
		$scope.updateItem = function(id) {
			$scope.loading = true;

			Item.update(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.items = data;
				});
		};

	}]);