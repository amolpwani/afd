'use strict';


//noinspection JSValidateJSDoc
/**
		 * @ngdoc service
		 * @module AfdUiAppListComponentsModule
		 * @name DeleteListModalService
		 * @description
		 * This service holds all the list deletion related operation
		 * @requires ListService
		 * @requires $uibModal
		 * */
angular.module('AfdUiAppListComponentsModule')
	.service('DeleteListModalService', ['ListService', '$uibModal', function(ListService, $uibModal) {

		/**
		 * @ngdoc method
		 * @name openDeleteModal
		 * @methodOf DeleteListModalService
		 * @params {object} listsToDelete
		 * @description This method opens a delete list dialog box.
		 */
		this.openDeleteModal = function(listsToDelete) {

			var deleteModalInstance = $uibModal.open({
				templateUrl: './afdUiApp/modules/listModule/components/modals/deleteListModal/deleteListModalTemplate.html',
				controller: 'DeleteListModalInstanceController as deleteListModalInstanceController',
				resolve: {
					lists: function() {
						return listsToDelete;
					}
				}
			});

			return deleteModalInstance.result.then(angular.bind(this, function() {

				return this.deleteListsAndProcessResults(listsToDelete);
			}));
		};

		/**
		 * @ngdoc method
		 * @name deleteListsAndProcessResults
		 * @methodOf DeleteListModalService
		 * @params {object} listsToDelete
		 * @description This method is to delete the lists and processed deleted results
		 */
		this.deleteListsAndProcessResults = function(listsToDelete) {
			return ListService.deleteLists(listsToDelete).then(angular.bind(this, function(results) {

				return this.processResultsForDisplay(results);
			}));
		};

		/**
		 * @ngdoc method
		 * @name processResultsForDisplay
		 * @methodOf DeleteListModalService
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
