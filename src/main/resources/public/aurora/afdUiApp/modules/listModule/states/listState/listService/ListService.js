'use strict';

//noinspection JSValidateJSDoc
/**
 * @ngdoc controller
 * @module AfdUiAppListComponentsModule
 * @name ListService
 * @description This service holds all the list related properties and methods.
 * @requires $q
 * @requires $state
 * @requires $translate
 * @requires WcHttpEndpointPrototype
 * @requires WcAlertConsoleService
 * @requires ConflictNotificationModalService
 * */
angular.module('AfdUiAppListModule').service('ListService', ['$q', '$state', '$translate', 'WcHttpEndpointPrototype', 'WcAlertConsoleService',
	function ($q, $state, $translate, WcHttpEndpointPrototype, WcAlertConsoleService) {

		//noinspection JSValidateJSDoc
		/**
		 * @ngdoc property
		 * @name listEndpoint
		 * @propertyOf ListService
		 * @type {WcHttpEndpointPrototype|*}
		 * @description This property holds the object for Http end point.
		 */
		this.listEndpoint = new WcHttpEndpointPrototype('listdata/getList');

		/**
		 * @ngdoc method
		 * @name getLists
		 * @methodOf ListService
		 * @returns {*} response object representing the offersEndpoint GET response
		 * @description The method get the list details from the list end point.
		 */
		this.getLists = function () {
			return this.listEndpoint.get({cache: 'localStorage', alwaysRefresh: true}).then(function (response) {
				return response.data;
			}, function(error) {
				return $q.reject(error);
			});
		};

		/**
		 * @ngdoc method
		 * @name getList
		 * @methodOf ListService
		 * @params {integer} listId
		 * @description The method gets the list information using GET request to list Endpoint.
		 */
		this.getList = function (id) {
			return this.listEndpoint.subRoute(id).get({cache: 'localStorage', alwaysRefresh: true}).then(function (response) {
				return response.data;
			}, function (error) {
				return $q.reject(error);
			});
		};

		/**
		 * @ngdoc method
		 * @name deleteLists
		 * @methodOf ListService
		 * @params {array} listsToDelete
		 * @description The method deletes the lists based on the lists index supplied.
		 */
		this.deleteLists = function (listsToDelete) {
			//since sending a body on DELETE is frowned upon, iterate through and send separate requests for each list to delete
			var deletePromises = [];
			var deleteResults = [];

			var addResultToArray = function (index, success) {
				//replace the initial promise with a new one that resolves with the data we just created
				deleteResults[index] = {
					'id': listsToDelete[index].id,
					'success': success
				};
			};

			var doDeleteForIndex = angular.bind(this, function (index) {

				deletePromises[index] = this.listEndpoint.delete(listsToDelete[index].id, {offline: 'queue'}).then(function (response) {
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

			for (var i = 0; i < listsToDelete.length; i++) {
				doDeleteForIndex(i);
			}

			return $q.all(deletePromises).then(function () {
				return deleteResults;
			});
		};


		/**
		 * @ngdoc method
		 * @name createList
		 * @methodOf ListService
		 * @description The method creates the list by send a POST request to list Endpoint.
		 */
		this.createList = function (list) {

			return this.listEndpoint.post(list, {offline: 'queue'}).then(angular.bind(this, function (response) {

				if (response.status == 'queue') {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('list.createList.createQueued'),
						type: 'success',
						multiple: false
					});
				}
				else {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('list.createList.createSuccess', {
							id: response.data.name
						}),
						type: 'success',
						multiple: false
					});
				}
				return $q.when(response.data);
			}), function (errorMsg) {
				
				if (errorMsg.status != 422) {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('list.createList.createFailed', {
							error: errorMsg.statusText
						}),
						type: 'danger',
						multiple: false
					});
				} else {			
					angular.forEach(errorMsg.data.failureList, function(failure) {
						WcAlertConsoleService.addMessage({
							message: $translate.instant('list.createList.createFailed', {
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
	}]);