'use strict';

//noinspection JSValidateJSDoc
/**
 * @ngdoc controller
 * @module AfdUiAppFoundationDataRowComponentsModule
 * @name FoundationDataRowService
 * @description This service holds all the foundationData related properties and methods.
 * @requires $q
 * @requires $state
 * @requires $translate
 * @requires WcHttpEndpointPrototype
 * @requires WcAlertConsoleService
 * @requires ConflictNotificationModalService
 * */
angular.module('AfdUiAppFoundationDataRowComponentsModule').service('FoundationDataRowService', ['$q', '$state', '$translate', 'WcHttpEndpointPrototype', 'WcAlertConsoleService',
	function ($q, $state, $translate, WcHttpEndpointPrototype, WcAlertConsoleService) {

		//noinspection JSValidateJSDoc
		/**
		 * @ngdoc property
		 * @name foundationDataRowEndPoint
		 * @propertyOf FoundationDataRowService
		 * @type {WcHttpEndpointPrototype|*}
		 * @description This property holds the object for Http end point.
		 */
		this.foundationDataRowEndPoint = new WcHttpEndpointPrototype('foundationdatarow/getFoundationDataRow');

		this.isEditing = false;

		/**
		 * @ngdoc method
		 * @name getFoundationDataRows
		 * @methodOf FoundationDataRowService
		 * @returns {*} response object representing the offersEndpoint GET response
		 * @description The method get the foundationDataRow details from the foundationDataRow end point.
		 */
		this.getFoundationDataRows = function () {
			return this.foundationDataRowEndPoint.get({cache: 'localStorage', alwaysRefresh: true}).then(function (response) {
				return response.data;
			}, function(error) {
				return $q.reject(error);
			});
		};

		/**
		 * @ngdoc method
		 * @name getFoundationDataRow
		 * @methodOf FoundationDataRowService
		 * @params {integer} foundationDataRowId
		 * @description The method gets the foundationDataRow information using GET request to foundationDataRow Endpoint.
		 */
		this.getFoundationDataRow = function (id) {
			return this.foundationDataRowEndPoint.subRoute(id).get({cache: 'localStorage', alwaysRefresh: true}).then(function (response) {
				return response.data;
			}, function (error) {
				return $q.reject(error);
			});
		};

		/**
		 * @ngdoc method
		 * @name deleteFoundationDataRows
		 * @methodOf FoundationDataRowService
		 * @params {array} FoundationDataRowsToDelete
		 * @description The method deletes the FoundationDataRows based on the FoundationDataRows index supplied.
		 */
		this.deleteFoundationDataRows = function (FoundationDataRowsToDelete) {
			//since sending a body on DELETE is frowned upon, iterate through and send separate requests for each foundationDataRow to delete
			var deletePromises = [];
			var deleteResults = [];

			var addResultToArray = function (index, success) {
				//replace the initial promise with a new one that resolves with the data we just created
				deleteResults[index] = {
					'name': FoundationDataRowsToDelete[index].uiColumnName,
					'success': success
				};
			};

			var doDeleteForIndex = angular.bind(this, function (index) {

				deletePromises[index] = this.foundationDataRowEndPoint.delete(FoundationDataRowsToDelete[index].id, {offline: 'queue'}).then(function (response) {
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

			for (var i = 0; i < FoundationDataRowsToDelete.length; i++) {
				doDeleteForIndex(i);
			}

			return $q.all(deletePromises).then(function () {
				return deleteResults;
			});
		};


		/**
		 * @ngdoc method
		 * @name createFoundationDataRow
		 * @methodOf FoundationDataRowService
		 * @description The method creates the foundationDataRow by send a POST request to foundationDataRow Endpoint.
		 */
		this.createFoundationDataRow = function (foundationDataRow) {

			return this.foundationDataRowEndPoint.post(foundationDataRow, {offline: 'queue'}).then(angular.bind(this, function (response) {

				if (response.status == 'queue') {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('foundationDataRow.createFoundationDataRow.createQueued'),
						type: 'success',
						multiple: false
					});
				}
				else {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('foundationDataRow.createFoundationDataRow.createSuccess', {
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
						message: $translate.instant('foundationDataRow.createFoundationDataRow.createFailed', {
							error: errorMsg.statusText
						}),
						type: 'danger',
						multiple: false
					});
				} else {			
					angular.forEach(errorMsg.data.failureFoundationDataRow, function(failure) {
						WcAlertConsoleService.addMessage({
							message: $translate.instant('foundationDataRow.createFoundationDataRow.createFailed', {
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
		 * @name updateFoundationDataRow
		 * @methodOf FoundationDataRowService
		 * @description The method updates the FoundationDataRows information to database.
		 */
		this.updateFoundationDataRow = function (foundationDataRow) {
			var id = foundationDataRow.id;
			
			return this.foundationDataRowEndPoint.put(id, foundationDataRow, {offline: 'queue'}).then(angular.bind(this, function (response) {

				if (response.status == 'queue') {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('foundationDataRow.editFoundationDataRow.updateQueued', {
							name: foundationDataRow.name
						}),
						type: 'success',
						multiple: false
					});
				}
				else {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('foundationDataRow.editFoundationDataRow.updateSuccess', {
                            name: foundationDataRow.name
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
					
					angular.forEach(error.data.failureFoundationDataRow, function(failure) {
						WcAlertConsoleService.addMessage({
							message: $translate.instant('foundationDataRow.editFoundationDataRow.updateFailed', {
								error: failure.message
							}),
							type: 'danger',
							multiple: false
						});
					});
					return $q.reject(error);
					
				} else {

					WcAlertConsoleService.addMessage({
						message: $translate.instant('foundationDataRow.editFoundationDataRow.updateFailed'),
						type: 'danger',
						multiple: false
					});
					return $q.reject(error);

				}
			}));
		};
	}]);
