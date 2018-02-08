'use strict';

//noinspection JSValidateJSDoc
/**
 * @ngdoc controller
 * @module AfdUiAppMasterDataComponentsModule
 * @name MasterDataService
 * @description This service holds all the masterData related properties and methods.
 * @requires $q
 * @requires $state
 * @requires $translate
 * @requires WcHttpEndpointPrototype
 * @requires WcAlertConsoleService
 * */
angular.module('AfdUiAppMasterDataComponentsModule').service('MasterDataService', ['$q', '$state', '$translate', 'WcHttpEndpointPrototype', 'WcAlertConsoleService',
	function ($q, $state, $translate, WcHttpEndpointPrototype, WcAlertConsoleService) {

		//noinspection JSValidateJSDoc
		/**
		 * @ngdoc property
		 * @name masterDataEndpoint
		 * @propertyOf MasterDataService
		 * @type {WcHttpEndpointPrototype|*}
		 * @description This property holds the object for Http end point.
		 */
		this.masterDataEndpoint = new WcHttpEndpointPrototype('masterdata/getMasterData');

		this.isEditing = false;

		/**
		 * @ngdoc method
		 * @name getMasterDatas
		 * @methodOf MasterDataService
		 * @returns {*} response object representing the offersEndpoint GET response
		 * @description The method get the masterData details from the masterData end point.
		 */
		this.getMasterDatas = function () {
			return this.masterDataEndpoint.get({cache: 'localStorage', alwaysRefresh: true}).then(function (response) {
				return response.data;
			}, function(error) {
				return $q.reject(error);
			});
		};

		/**
		 * @ngdoc method
		 * @name getMasterData
		 * @methodOf MasterDataService
		 * @params {integer} masterDataId
		 * @description The method gets the masterData information using GET request to masterData Endpoint.
		 */
		this.getMasterData = function (id) {
			return this.masterDataEndpoint.subRoute(id).get({cache: 'localStorage', alwaysRefresh: true}).then(function (response) {
				return response.data;
			}, function (error) {
				return $q.reject(error);
			});
		};

		/**
		 * @ngdoc method
		 * @name deleteMasterDatas
		 * @methodOf MasterDataService
		 * @params {array} masterDatasToDelete
		 * @description The method deletes the masterDatas based on the masterDatas index supplied.
		 */
		this.deleteMasterDatas = function (masterDatasToDelete) {
			//since sending a body on DELETE is frowned upon, iterate through and send separate requests for each masterData to delete
			var deletePromises = [];
			var deleteResults = [];

			var addResultToArray = function (index, success) {
				//replace the initial promise with a new one that resolves with the data we just created
				deleteResults[index] = {
					'name': masterDatasToDelete[index].name,
					'success': success
				};
			};

			var doDeleteForIndex = angular.bind(this, function (index) {

				deletePromises[index] = this.masterDataEndpoint.delete(masterDatasToDelete[index].id, {offline: 'queue'}).then(function (response) {
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

			for (var i = 0; i < masterDatasToDelete.length; i++) {
				doDeleteForIndex(i);
			}

			return $q.all(deletePromises).then(function () {
				return deleteResults;
			});
		};


		/**
		 * @ngdoc method
		 * @name createMasterData
		 * @methodOf MasterDataService
		 * @description The method creates the masterData by send a POST request to masterData Endpoint.
		 */
		this.createMasterData = function (masterData) {

			return this.masterDataEndpoint.post(masterData, {offline: 'queue'}).then(angular.bind(this, function (response) {

				if (response.status == 'queue') {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('masterData.createMasterData.createQueued'),
						type: 'success',
						multiple: false
					});
				}
				else {
					if (response.data.name === 'duplicateName') {
						WcAlertConsoleService.addMessage({
							message: $translate.instant('masterData.createMasterData.duplicateName', {
								name: masterData.name
							}),
							type: 'danger',
							multiple: false
						});
						return $q.reject('');
					} else {
						WcAlertConsoleService.addMessage({
							message: $translate.instant('masterData.createMasterData.createSuccess', {
								name: response.data.name
							}),
							type: 'success',
							multiple: false
						});
					}
				}
				return $q.when(response.data);
			}), function (errorMsg) {
				
				if (errorMsg.status != 422) {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('masterData.createMasterData.createFailed', {
							error: errorMsg.statusText
						}),
						type: 'danger',
						multiple: false
					});
				} else {			
					angular.forEach(errorMsg.data.failureMasterData, function(failure) {
						WcAlertConsoleService.addMessage({
							message: $translate.instant('masterData.createMasterData.createFailed', {
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
		 * @name updateMasterData
		 * @methodOf MasterDataService
		 * @description The method updates the masterDatas information to database.
		 */
		this.updateMasterData = function (masterData) {
			var id = masterData.id;
			
			return this.masterDataEndpoint.put(id, masterData, {offline: 'queue'}).then(angular.bind(this, function (response) {

				if (response.status == 'queue') {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('masterData.editMasterData.updateQueued', {
							name: masterData.name
						}),
						type: 'success',
						multiple: false
					});
				}
				else {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('masterData.editMasterData.updateSuccess', {
                            name: masterData.name
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
					
					angular.forEach(error.data.failureMasterData, function(failure) {
						WcAlertConsoleService.addMessage({
							message: $translate.instant('masterData.editMasterData.updateFailed', {
								error: failure.message
							}),
							type: 'danger',
							multiple: false
						});
					});
					return $q.reject(error);
					
				} else {

					WcAlertConsoleService.addMessage({
						message: $translate.instant('masterData.editMasterData.updateFailed'),
						type: 'danger',
						multiple: false
					});
					return $q.reject(error);

				}
			}));
		};
	}]);
