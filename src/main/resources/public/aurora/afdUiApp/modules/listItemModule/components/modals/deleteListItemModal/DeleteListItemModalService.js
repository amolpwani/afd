'use strict';


//noinspection JSValidateJSDoc
/**
		 * @ngdoc service
		 * @module AfdUiAppListItemComponentsModule
		 * @name DeleteListItemModalService
		 * @description
		 * This service holds all the listItem deletion related operation
		 * @requires ListItemService
		 * @requires $uibModal
		 * */
angular.module('AfdUiAppListItemComponentsModule')
	.service('DeleteListItemModalService', ['ListItemService', '$uibModal', function(ListItemService, $uibModal) {

		/**
		 * @ngdoc method
		 * @name openDeleteModal
		 * @methodOf DeleteListItemModalService
		 * @params {object} listItemsToDelete
		 * @description This method opens a delete list dialog box.
		 */
		this.openDeleteModal = function(listItemsToDelete) {

			var deleteModalInstance = $uibModal.open({
				templateUrl: './afdUiApp/modules/listItemModule/components/modals/deleteListItemModal/deleteListItemModalTemplate.html',
				controller: 'DeleteListItemModalInstanceController as deleteListItemModalInstanceController',
				resolve: {
					listItems: function() {
						return listItemsToDelete;
					}
				}
			});

			return deleteModalInstance.result.then(angular.bind(this, function() {

				return this.deleteListItemsAndProcessResults(listItemsToDelete);
			}));
		};

		/**
		 * @ngdoc method
		 * @name deleteListItemsAndProcessResults
		 * @methodOf DeleteListItemModalService
		 * @params {object} listItemsToDelete
		 * @description This method is to delete the listItems and processed deleted results
		 */
		this.deleteListItemsAndProcessResults = function(listItemsToDelete) {
			return ListItemService.deleteListItems(listItemsToDelete).then(angular.bind(this, function(results) {

				return this.processResultsForDisplay(results);
			}));
		};

		/**
		 * @ngdoc method
		 * @name processResultsForDisplay
		 * @methodOf DeleteListItemModalService
		 * @params {object} results
		 * @description This method is to process the results for display
		 */
		this.processResultsForDisplay = function(results) {
			//take the results array and process it into an object with a collection of successes, queued requests and failures
			var successfulResults = [];
			var queuedResults = [];
			var failedResults = [];

			for(var i=0; i<results.length; i++){
				if(results[i].success === true){
					successfulResults.push(results[i]);
				}
				else if(results[i].success === 'queue') {
					queuedResults.push(results[i]);
				}
				else {
					failedResults.push(results[i]);
				}
			}
			return {'successfulResults': successfulResults, 'queuedResults': queuedResults, 'failedResults': failedResults};
		};
	}]);
