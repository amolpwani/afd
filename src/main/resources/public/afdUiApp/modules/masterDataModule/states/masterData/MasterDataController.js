'use strict';

//noinspection JSValidateJSDoc
/**
			 * @ngdoc controller
			 * @module AfdUiAppMasterDataModule
			 * @name MasterDataController
			 * @description This controller holds the methods and properties for list masterDataList.
			 * @requires MasterDataService
			 * @requires $filter
			 * @requires masterDataList
			 * @requires $scope
			 * @requires WcAlertConsoleService
			 * @requires $translate
			 * @requires $state
			 * @requires WcDataTableService
			 * @requires $timeout
			 * */
angular.module('AfdUiAppMasterDataModule')
	.controller('MasterDataController', ['MasterDataService', 'masterDataList', 'DeleteModalService', '$scope', 'WcAlertConsoleService', '$translate', '$state',
		function(MasterDataService, masterDataList, DeleteModalService, $scope, WcAlertConsoleService, $translate, $state) {

			//noinspection JSValidateJSDoc
            /**
			 * @ngdoc property
			 * @name masterDataList
			 * @propertyOf MasterDataController
			 * @type {array}
			 * @description This property holds the list of masterDataList.
			 */
			this.masterDataList = masterDataList;

			/**
			 * @ngdoc method
			 * @name getSelectedMasterDataObjects
			 * @methodOf MasterDataController
			 * @params {integer} id
			 * @returns {object} selectedMasterDatas
			 * @description Helper function to use in tandem with the datatable selection api.
			 */
			this.getSelectedMasterDataObjects = function(id) {
				var selectedUUID = id;
				if(selectedUUID === undefined) {
					selectedUUID = this.masterDataListToDelete;
				}
				else { //noinspection NodeModulesDependencies
					if(!angular.isArray(selectedUUID)) {
                                        selectedUUID = [].concat(selectedUUID);
                                    }
				}
				var selectedMasterDatas = [];
				angular.forEach(this.masterDataList, function(list) {
					for(var i = 0; i < selectedUUID.length; i++) {
						if(list.id === selectedUUID[i]) {
							selectedMasterDatas.push(list);
						}
					}
				});

				return selectedMasterDatas;
			};

			$scope.$on("update-masterData", angular.bind(this, function(event, data) { // jshint ignore:line

				this.updateMasterData(this.getSelectedMasterDataObjects(data)[0]);
			}));

			$scope.$on("delete-masterDataList", angular.bind(this, function(event, data) { // jshint ignore:line

				//this.deleteMasterDatas(this.getSelectedMasterDataObjects(data));
				return DeleteModalService.openDeleteModal(this.getSelectedMasterDataObjects(data), 'MasterData').then(angular.bind(this, function(results) {
					$scope.afdUiAppController.reloadState(this.processAndDisplayDeletionResults, results);
				}));
			}));

			/**
			 * @ngdoc method
			 * @name getSelectedMasterDataObjects
			 * @methodOf MasterDataController
			 * @params {string} updateType
			 * @params {string} selectedMasterData
			 * @description The method updates the list details to database based on updateType and selectedMasterData.
			 */
			this.updateMasterData = function(selectedMasterData) {
				MasterDataService.isEditing = true;
                MasterDataService.masterData = selectedMasterData;
				$state.go('create-masterData');
			};
			
			
			
			/**
			 * @ngdoc method
			 * @name deleteMasterDatas
			 * @params {array} bookingConfirmationNumbers
			 * @description The method is for delete the bookings from the database.
			 */
			this.deleteSelectedMasterData = function(ids) {
				return DeleteModalService.openDeleteModal(this.getSelectedMasterDataObjects(ids), 'MasterData').then(angular.bind(this, function(results) {
					$scope.afdUiAppController.reloadState(this.processAndDisplayDeletionResults, results);
				}));
			};
			
			/**
			 * @ngdoc method
			 * @name processResultsForDisplay
			 * @methodOf DeleteModalService
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
			 * @name deleteMasterDatasAndProcessResults
			 * @methodOf MasterDataService
			 * @params {object} masterDataListToDelete
			 * @description This method is to delete the bookings and processed deleted results
			 */
			this.deleteMasterDatasAndProcessResults = function(masterDataListToDelete) {
				return MasterDataService.deleteMasterDatas(masterDataListToDelete).then(angular.bind(this, function(results) {

					return this.processResultsForDisplay(results);
				}));
			};

			/**
			 * @ngdoc method
			 * @name deleteMasterDatas
			 * @methodOf MasterDataController
			 * @params {object} masterDataList
			 * @description This method is for delete the list from database
			 */
			this.deleteMasterDatas = function(masterDataList) {
				return this.deleteMasterDatasAndProcessResults(masterDataList).then(angular.bind(this, function(results) {

					$scope.$parent.afdUiAppController.reloadState(this.processAndDisplayDeletionResults, results);
				}));
				return null;
			};
			/**
			 * @ngdoc method
			 * @name processAndDisplayDeletionResults
			 * @methodOf MasterDataController
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
