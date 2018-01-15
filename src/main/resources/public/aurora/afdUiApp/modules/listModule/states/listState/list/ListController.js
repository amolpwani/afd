'use strict';

//noinspection JSValidateJSDoc
/**
			 * @ngdoc controller
			 * @module AfdUiAppListModule
			 * @name ListController
			 * @description This controller holds the methods and properties for list lists.
			 * @requires ListService
			 * @requires $filter
			 * @requires lists
			 * @requires $scope
			 * @requires WcAlertConsoleService
			 * @requires $translate
			 * @requires $state
			 * @requires WcDataTableService
			 * @requires $timeout
			 * */
angular.module('AfdUiAppListModule')
	.controller('ListController', ['ListService', 'lists', '$scope', 'WcAlertConsoleService', '$translate', '$state',
		function(ListService, lists, $scope, WcAlertConsoleService, $translate, $state) {

			//noinspection JSValidateJSDoc
            /**
			 * @ngdoc property
			 * @name lists
			 * @propertyOf ListController
			 * @type {array}
			 * @description This property holds the list of lists.
			 */
			this.lists = lists;

			/**
			 * @ngdoc method
			 * @name getSelectedListObjects
			 * @methodOf ListController
			 * @params {integer} id
			 * @returns {object} selectedLists
			 * @description Helper function to use in tandem with the datatable selection api.
			 */
			this.getSelectedListObjects = function(id) {
				var selectedUUID = id;
				if(selectedUUID === undefined) {
					selectedUUID = this.listsToDelete;
				}
				else { //noinspection NodeModulesDependencies
					if(!angular.isArray(selectedUUID)) {
                                        selectedUUID = [].concat(selectedUUID);
                                    }
				}
				var selectedLists = [];
				angular.forEach(this.lists, function(list) {
					for(var i = 0; i < selectedUUID.length; i++) {
						if(list.id === selectedUUID[i]) {
							selectedLists.push(list);
						}
					}
				});

				return selectedLists;
			};

			$scope.$on("view-list", angular.bind(this, function(event, data) { // jshint ignore:line

				this.viewBooking(this.getSelectedListObjects(data)[0]);
			}));

			$scope.$on("update-list-options", angular.bind(this, function(event, data) { // jshint ignore:line

				this.updateList("options", this.getSelectedListObjects(data)[0]);
			}));

			$scope.$on("delete-lists", angular.bind(this, function(event, data) { // jshint ignore:line

				this.deleteLists(this.getSelectedListObjects(data));
			}));

			/**
			 * @ngdoc method
			 * @name viewBooking
			 * @methodOf ListController
			 * @params {object} data
			 * @description This method is for view the list informations
			 */
			this.viewBooking = function(data) {
				var param = {
					confirmationNumber: data.confirmationNumber
				};
				//noinspection JSCheckFunctionSignatures
				$state.go('view-list', param);
			};

			/**
			 * @ngdoc method
			 * @name getSelectedListObjects
			 * @methodOf ListController
			 * @params {string} updateType
			 * @params {string} selectedBooking
			 * @description The method updates the list details to database based on updateType and selectedBooking.
			 */
			this.updateList = function(updateType, selectedBooking) {
				var param = {
					confirmationNumber: selectedBooking.confirmationNumber
				};
				ListService.isEditing = true;
				if(updateType == 'options') {
					//noinspection JSCheckFunctionSignatures
					$state.go('update-list.select-list-options', param);
				} else {
					//noinspection JSCheckFunctionSignatures
					$state.go('update-list.select-departing-flight', param);
				}
			};
			
			/**
			 * @ngdoc method
			 * @name deleteListsAndProcessResults
			 * @methodOf ListService
			 * @params {object} listsToDelete
			 * @description This method is to delete the bookings and processed deleted results
			 */
			this.deleteListsAndProcessResults = function(listsToDelete) {
				return ListService.deleteLists(listsToDelete).then(angular.bind(this, function(results) {

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
			 * @name deleteLists
			 * @methodOf ListController
			 * @params {object} lists
			 * @description This method is for delete the list from database
			 */
			this.deleteLists = function(lists) {
				return this.deleteListsAndProcessResults(lists).then(angular.bind(this, function(results) {

					$scope.$parent.newUiAppController.reloadState(this.processAndDisplayDeletionResults, results);
				}));
				return null;
			};
			/**
			 * @ngdoc method
			 * @name processAndDisplayDeletionResults
			 * @methodOf ListController
			 * @params {object} results
			 * @description This method is to process and display the deleted results
			 */
			this.processAndDisplayDeletionResults = function(results) {
				var createDisplayStr = function(array) {
					var displayStr = '';
					for(var i = 0; i < array.length; i++) {
						displayStr += array[i].confirmationNumber;
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
