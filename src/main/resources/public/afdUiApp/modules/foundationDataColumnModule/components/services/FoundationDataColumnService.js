'use strict';

//noinspection JSValidateJSDoc
/**
 * @ngdoc controller
 * @module AfdUiAppFoundationDataColumnComponentsComponentsModule
 * @name FoundationDataColumnService
 * @description This service holds all the foundationDataColumn related properties and methods.
 * @requires $q
 * @requires $state
 * @requires $translate
 * @requires WcHttpEndpointPrototype
 * @requires WcAlertConsoleService
 * @requires ConflictNotificationModalService
 * */
angular.module('AfdUiAppFoundationDataColumnComponentsModule').service('FoundationDataColumnService', ['$q', '$state', '$translate', 'WcHttpEndpointPrototype', 'WcAlertConsoleService',
	function ($q, $state, $translate, WcHttpEndpointPrototype, WcAlertConsoleService) {

		//noinspection JSValidateJSDoc
		/**
		 * @ngdoc property
		 * @name foundationDataColumnEndPoint
		 * @propertyOf FoundationDataColumnService
		 * @type {WcHttpEndpointPrototype|*}
		 * @description This property holds the object for Http end point.
		 */
		this.foundationDataColumnEndPoint = new WcHttpEndpointPrototype('foundationdatacolumn/getFoundationColumn');

		this.isEditing = false;

		/**
		 * @ngdoc method
		 * @name getFoundationDataColumns
		 * @methodOf FoundationDataColumnService
		 * @returns {*} response object representing the offersEndpoint GET response
		 * @description The method get the foundationDataColumn details from the foundationDataColumn end point.
		 */
		this.getFoundationDataColumns = function () {
			return this.foundationDataColumnEndPoint.get({cache: 'localStorage', alwaysRefresh: true}).then(function (response) {
				return response.data;
			}, function(error) {
				return $q.reject(error);
			});
		};

		/**
		 * @ngdoc method
		 * @name getFoundationDataColumn
		 * @methodOf FoundationDataColumnService
		 * @params {integer} foundationDataColumnId
		 * @description The method gets the foundationDataColumn information using GET request to foundationDataColumn Endpoint.
		 */
		this.getFoundationDataColumn = function (id) {
			return this.foundationDataColumnEndPoint.subRoute(id).get({cache: 'localStorage', alwaysRefresh: true}).then(function (response) {
				return response.data;
			}, function (error) {
				return $q.reject(error);
			});
		};

		/**
		 * @ngdoc method
		 * @name deleteFoundationDataColumns
		 * @methodOf FoundationDataColumnService
		 * @params {array} FoundationDataColumnsToDelete
		 * @description The method deletes the FoundationDataColumns based on the FoundationDataColumns index supplied.
		 */
		this.deleteFoundationDataColumns = function (FoundationDataColumnsToDelete) {
			//since sending a body on DELETE is frowned upon, iterate through and send separate requests for each foundationDataColumn to delete
			var deletePromises = [];
			var deleteResults = [];

			var addResultToArray = function (index, success) {
				//replace the initial promise with a new one that resolves with the data we just created
				deleteResults[index] = {
					'name': FoundationDataColumnsToDelete[index].uiColumnName,
					'success': success
				};
			};

			var doDeleteForIndex = angular.bind(this, function (index) {

				deletePromises[index] = this.foundationDataColumnEndPoint.delete(FoundationDataColumnsToDelete[index].id, {offline: 'queue'}).then(function (response) {
					if (response.status == 'queue') {
						addResultToArray(index, 'queue');
					}
					else {
						addResultToArray(index, true);
					}
				}).catch(function () {
					addResultToArray(index, false);
				});
			});

			for (var i = 0; i < FoundationDataColumnsToDelete.length; i++) {
				doDeleteForIndex(i);
			}

			return $q.all(deletePromises).then(function () {
				return deleteResults;
			});
		};


		/**
		 * @ngdoc method
		 * @name createFoundationDataColumn
		 * @methodOf FoundationDataColumnService
		 * @description The method creates the foundationDataColumn by send a POST request to foundationDataColumn Endpoint.
		 */
		this.createFoundationDataColumn = function (foundationDataColumn) {

			return this.foundationDataColumnEndPoint.post(foundationDataColumn, {offline: 'queue'}).then(angular.bind(this, function (response) {

				if (response.status == 'queue') {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('foundationDataColumn.createFoundationDataColumn.createQueued'),
						type: 'success',
						multiple: false
					});
				}
				else {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('foundationDataColumn.createFoundationDataColumn.createSuccess', {
							name: response.data.uiColumnName
						}),
						type: 'success',
						multiple: false
					});
				}
				return $q.when(response.data);
			}), function (errorMsg) {
				
				if (errorMsg.status != 422) {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('foundationDataColumn.createFoundationDataColumn.createFailed', {
							error: errorMsg.statusText
						}),
						type: 'danger',
						multiple: false
					});
				} else {			
					angular.forEach(errorMsg.data.failureFoundationDataColumn, function(failure) {
						WcAlertConsoleService.addMessage({
							message: $translate.instant('foundationDataColumn.createFoundationDataColumn.createFailed', {
								error: failure.message
							}),
							type: 'danger',
							multiple: false
						});
					});
				}
				return $q.reject(errorMsg);
			});
		};
		
		/**
		 * @ngdoc method
		 * @name updateFoundationDataColumn
		 * @methodOf FoundationDataColumnService
		 * @description The method updates the FoundationDataColumns information to database.
		 */
		this.updateFoundationDataColumn = function (foundationDataColumn) {
			var id = foundationDataColumn.id;
			
			return this.foundationDataColumnEndPoint.put(id, foundationDataColumn, {offline: 'queue'}).then(angular.bind(this, function (response) {

				if (response.status == 'queue') {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('foundationDataColumn.editFoundationDataColumn.updateQueued', {
							name: foundationDataColumn.uiColumnName
						}),
						type: 'success',
						multiple: false
					});
				}
				else {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('foundationDataColumn.editFoundationDataColumn.updateSuccess', {
                            name: foundationDataColumn.uiColumnName
						}),
						type: 'success',
						multiple: false
					});
				}
				return $q.when(response.data);
			}), angular.bind(this, function (error) {

				if (error.status === 409) {

					//TODO

				} else if (error.status === 422) {
					
					angular.forEach(error.data.failureFoundationDataColumn, function(failure) {
						WcAlertConsoleService.addMessage({
							message: $translate.instant('foundationDataColumn.editFoundationDataColumn.updateFailed', {
								error: failure.message
							}),
							type: 'danger',
							multiple: false
						});
					});
					return $q.reject(error);
					
				} else {

					WcAlertConsoleService.addMessage({
						message: $translate.instant('foundationDataColumn.editFoundationDataColumn.updateFailed'),
						type: 'danger',
						multiple: false
					});
					return $q.reject(error);

				}
			}));
		};
	}]);
