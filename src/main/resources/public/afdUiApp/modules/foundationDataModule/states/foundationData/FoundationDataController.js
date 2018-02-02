'use strict';

//noinspection JSValidateJSDoc
/**
			 * @ngdoc controller
			 * @module AfdUiAppFoundationDataModule
			 * @name FoundationDataController
			 * @description This controller holds the methods and properties for foundationDatas.
			 * @requires FoundationDataService
			 * @requires $filter
			 * @requires foundationDatas
			 * @requires $scope
			 * @requires WcAlertConsoleService
			 * @requires $translate
			 * @requires $state
			 * @requires WcDataTableService
			 * @requires $timeout
			 * */
angular.module('AfdUiAppFoundationDataModule')
	.controller('FoundationDataController', ['FoundationDataService', 'foundationDatas', '$scope', 'WcAlertConsoleService', '$translate', '$state',
		function(FoundationDataService, foundationDatas, $scope, WcAlertConsoleService, $translate, $state) {

			//noinspection JSValidateJSDoc
            /**
			 * @ngdoc property
			 * @name foundationDatas
			 * @propertyOf FoundationDataController
			 * @type {array}
			 * @description This property holds the foundationData of foundationDatas.
			 */
			this.foundationDatas = foundationDatas;

			/**
			 * @ngdoc method
			 * @name getSelectedFoundationDataObjects
			 * @methodOf FoundationDataController
			 * @params {integer} id
			 * @returns {object} selectedfoundationDatas
			 * @description Helper function to use in tandem with the datatable selection api.
			 */
			this.getSelectedFoundationDataObjects = function(id) {
				var selectedId = id;
				if(selectedId === undefined) {
					selectedId = this.foundationDatasToDelete;
				}
				else { //noinspection NodeModulesDependencies
					if(!angular.isArray(selectedId)) {
                        selectedId = [].concat(selectedId);
                    }
				}
				var selectedfoundationDatas = [];
				angular.forEach(this.foundationDatas, function(foundationData) {
					for(var i = 0; i < selectedId.length; i++) {
						if(foundationData.id === selectedId[i]) {
							selectedfoundationDatas.push(foundationData);
						}
					}
				});

				return selectedfoundationDatas;
			};

			$scope.$on("update-foundationData", angular.bind(this, function(event, data) { // jshint ignore:line

				this.updateFoundationData(this.getSelectedFoundationDataObjects(data)[0]);
			}));

			$scope.$on("delete-foundationDatas", angular.bind(this, function(event, data) { // jshint ignore:line

				this.deletefoundationDatas(this.getSelectedFoundationDataObjects(data));
			}));

			/**
			 * @ngdoc method
			 * @name getSelectedFoundationDataObjects
			 * @methodOf FoundationDataController
			 * @params {string} updateType
			 * @params {string} selectedfoundationData
			 * @description The method updates the foundationData details to database based on updateType and selectedfoundationData.
			 */
			this.updateFoundationData = function(selectedfoundationData) {
				FoundationDataService.isEditing = true;
                FoundationDataService.foundationData = selectedfoundationData;
				$state.go('create-foundationData');
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
			 * @name deletefoundationDatasAndProcessResults
			 * @methodOf FoundationDataService
			 * @params {object} foundationDatasToDelete
			 * @description This method is to delete the bookings and processed deleted results
			 */
			this.deletefoundationDatasAndProcessResults = function(foundationDatasToDelete) {
				return FoundationDataService.deletefoundationDatas(foundationDatasToDelete).then(angular.bind(this, function(results) {

					return this.processResultsForDisplay(results);
				}));
			};

			/**
			 * @ngdoc method
			 * @name deletefoundationDatas
			 * @methodOf FoundationDataController
			 * @params {object} foundationDatas
			 * @description This method is for delete the foundationData from database
			 */
			this.deletefoundationDatas = function(foundationDatas) {
				return this.deletefoundationDatasAndProcessResults(foundationDatas).then(angular.bind(this, function(results) {

					$scope.$parent.afdUiAppController.reloadState(this.processAndDisplayDeletionResults, results);
				}));
				return null;
			};
			/**
			 * @ngdoc method
			 * @name processAndDisplayDeletionResults
			 * @methodOf FoundationDataController
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
						message: results.successfulResults.length + ' foundationData(s) were deleted. [' + createDisplayStr(results.successfulResults) + ']',
						type: 'success',
						multiple: false,
                        timeout: 15
					});
				}
				if(results.queuedResults.length) {
					WcAlertConsoleService.addMessage({
						message: results.queuedResults.length + ' foundationData(s) queued for deletion when network connectivity is restored. [' + createDisplayStr(results.queuedResults) + ']',
						type: 'success',
						multiple: false,
                        timeout: 15
					});
				}
				if(results.failedResults.length) {
					WcAlertConsoleService.addMessage({
						message: results.failedResults.length + ' foundationData(s) failed to be deleted. [' + createDisplayStr(results.failedResults) + ']',
						type: 'danger',
						multiple: false
					});
				}
			};
		}
	]);
