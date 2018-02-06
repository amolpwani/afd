'use strict';

//noinspection JSValidateJSDoc
/**
			 * @ngdoc controller
			 * @module AfdUiAppMasterDataItemModule
			 * @name MasterDataItemController
			 * @description This controller holds the methods and properties for list masterDataItems.
			 * @requires MasterDataItemService
			 * @requires $filter
			 * @requires masterDataItems
			 * @requires $scope
			 * @requires WcAlertConsoleService
			 * @requires $translate
			 * @requires $state
			 * @requires WcDataTableService
			 * @requires $timeout
			 * */
angular.module('AfdUiAppMasterDataItemModule')
	.controller('MasterDataItemController', ['MasterDataItemService', 'masterDataItems', '$scope', 'DeleteModalService', 'WcAlertConsoleService', '$translate', '$state', '$stateParams',
		function(MasterDataItemService, masterDataItems, $scope, DeleteModalService, WcAlertConsoleService, $translate, $state, $stateParams) {

			//noinspection JSValidateJSDoc
            /**
			 * @ngdoc property
			 * @name masterDataItems
			 * @propertyOf MasterDataItemController
			 * @type {array}
			 * @description This property holds the list of masterDataItems.
			 */
			this.masterDataItems = masterDataItems;
			this.masterDataId = $stateParams.id;

			/**
			 * @ngdoc method
			 * @name getselectedMasterDataItemObjects
			 * @methodOf MasterDataItemController
			 * @params {integer} id
			 * @returns {object} selectedMasterDataItems
			 * @description Helper function to use in tandem with the datatable selection api.
			 */
			this.getselectedMasterDataItemObjects = function(id) {
				var selectedId = id;
				if(selectedId === undefined) {
					selectedId = this.masterDataItemsToDelete;
				}
				else { //noinspection NodeModulesDependencies
					if(!angular.isArray(selectedId)) {
                                        selectedId = [].concat(selectedId);
                                    }
				}
				var selectedMasterDataItems = [];
				angular.forEach(this.masterDataItems, function(list) {
					for(var i = 0; i < selectedId.length; i++) {
						if(list.id === selectedId[i]) {
							selectedMasterDataItems.push(list);
						}
					}
				});

				return selectedMasterDataItems;
			};

            $scope.$on("update-masterDataItem", angular.bind(this, function(event, data) { // jshint ignore:line

                this.updateMasterDataItem(this.getselectedMasterDataItemObjects(data)[0]);
            }));

			$scope.$on("delete-masterDataItems", angular.bind(this, function(event, data) { // jshint ignore:line

				//this.deleteMasterDataItems(this.getselectedMasterDataItemObjects(data));
				return DeleteModalService.openDeleteModal(this.getselectedMasterDataItemObjects(data), 'MasterDataItem').then(angular.bind(this, function(results) {
					$scope.afdUiAppController.reloadState(this.processAndDisplayDeletionResults, results);
				}));
			}));

            /**
             * @ngdoc method
             * @name getselectedMasterDataItemObjects
             * @methodOf MasterDataItemController
             * @params {string} updateType
             * @params {string} selectedMasterDataItem
             * @description The method updates the list details to database based on updateType and selectedMasterDataItem.
             */
            this.updateMasterDataItem = function(selectedMasterDataItem) {
                MasterDataItemService.isEditing = true;
                MasterDataItemService.masterDataItem = selectedMasterDataItem;
                $state.go('create-masterDataItem', {id:$stateParams.id});
            };
			
			/**
			 * @ngdoc method
			 * @name deleteMasterDataItems
			 * @methodOf MasterDataItemController
			 * @params {object} lists
			 * @description This method is for delete the list from database
			 */
			this.deleteMasterDataItems = function(deleteMasterDataItems) {
				return this.deleteMasterDataItemsAndProcessResults(deleteMasterDataItems).then(angular.bind(this, function(results) {

					$scope.$parent.afdUiAppController.reloadState(this.processAndDisplayDeletionResults, results);
				}));
				return null;
			};

			/**
			 * @ngdoc method
			 * @name deleteMasterDataItemsAndProcessResults
			 * @methodOf MasterDataItemService
			 * @params {object} masterDataItemsToDelete
			 * @description This method is to delete the bookings and processed deleted results
			 */
			this.deleteMasterDataItemsAndProcessResults = function(masterDataItemsToDelete) {
				return MasterDataItemService.deleteMasterDataItems(masterDataItemsToDelete).then(angular.bind(this, function(results) {
					return this.processResultsForDisplay(results);
				}));
			};
			
			/**
			 * @ngdoc method
			 * @name processResultsForDisplay
			 * @methodOf DeleteBookingModalService
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

			/**
			 * @ngdoc method
			 * @name processAndDisplayDeletionResults
			 * @methodOf MasterDataItemController
			 * @params {object} results
			 * @description This method is to process and display the deleted results
			 */
			this.processAndDisplayDeletionResults = function(results) {
				var createDisplayStr = function(array) {
					var displayStr = '';
					for(var i = 0; i < array.length; i++) {
						displayStr += array[i].name;
						if(i != array.length - 1) {
							displayStr += ', ';
						}
					}
					return displayStr;
				};

				if(results.successfulResults.length) {
					WcAlertConsoleService.addMessage({
						message: results.successfulResults.length + ' list(s) were deleted. [' + createDisplayStr(results.successfulResults) + ']',
						type: 'success',
						multiple: false,
                        timeout: 15
					});
				}
				if(results.queuedResults.length) {
					WcAlertConsoleService.addMessage({
						message: results.queuedResults.length + ' list(s) queued for deletion when network connectivity is restored. [' + createDisplayStr(results.queuedResults) + ']',
						type: 'success',
						multiple: false,
                        timeout: 15
					});
				}
				if(results.failedResults.length) {
					WcAlertConsoleService.addMessage({
						message: results.failedResults.length + ' list(s) failed to be deleted. [' + createDisplayStr(results.failedResults) + ']',
						type: 'danger',
						multiple: false
					});
				}
			};
		}
	]);
