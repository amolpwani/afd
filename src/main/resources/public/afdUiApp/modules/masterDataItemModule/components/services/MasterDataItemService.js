'use strict';

//noinspection JSValidateJSDoc
/**
 * @ngdoc controller
 * @module AfdUiAppMasterDataItemComponentsModule
 * @name MasterDataItemService
 * @description This service holds all the list related properties and methods.
 * @requires $q
 * @requires $state
 * @requires $translate
 * @requires WcHttpEndpointPrototype
 * @requires WcAlertConsoleService
 * @requires ConflictNotificationModalService
 * */
angular.module('AfdUiAppMasterDataItemComponentsModule').service('MasterDataItemService', ['$q', '$state', '$translate', 'WcHttpEndpointPrototype', 'WcAlertConsoleService',
	function ($q, $state, $translate, WcHttpEndpointPrototype, WcAlertConsoleService) {

		//noinspection JSValidateJSDoc
		/**
		 * @ngdoc property
		 * @name masterDataItemEndpoint
		 * @propertyOf MasterDataItemService
		 * @type {WcHttpEndpointPrototype|*}
		 * @description This property holds the object for Http end point.
		 */
		this.masterDataItemEndpoint = new WcHttpEndpointPrototype('masterdataitem/getMasterDataItem');
		this.masterDataItemMasterDataIdEndpoint = new WcHttpEndpointPrototype('masterdataitem/getMasterDataItemByMasterDataId');

		/**
		 * @ngdoc method
		 * @name getMasterDataItemItems
		 * @methodOf MasterDataItemService
		 * @returns {*} response object representing the offersEndpoint GET response
		 * @description The method get the list details from the list end point.
		 */
		this.getMasterDataItems = function () {
			return this.masterDataItemEndpoint.get({cache: 'localStorage', alwaysRefresh: true}).then(function (response) {
				return response.data;
			}, function(error) {
				return $q.reject(error);
			});
		};
		
		/**
		 * @ngdoc method
		 * @name getMasterDataItemItems
		 * @methodOf MasterDataItemService
		 * @params {integer} masterDataId
		 * @returns {*} response object representing the offersEndpoint GET response
		 * @description The method get the list details from the list end point.
		 */
		this.getMasterDataItemsWithMasterDataId = function (masterDataId) {
			return this.masterDataItemMasterDataIdEndpoint.subRoute(masterDataId).get({cache: 'localStorage', alwaysRefresh: true}).then(function (response) {
				return response.data;
			}, function(error) {
				return $q.reject(error);
			});
		};

		/**
		 * @ngdoc method
		 * @name getMasterDataItem
		 * @methodOf MasterDataItemService
		 * @params {integer} masterDataId
		 * @description The method gets the list information using GET request to list Endpoint.
		 */
		this.getMasterDataItem = function (id) {
			return this.masterDataItemEndpoint.subRoute(id).get({cache: 'localStorage', alwaysRefresh: true}).then(function (response) {
				return response.data;
			}, function (error) {
				return $q.reject(error);
			});
		};

		/**
		 * @ngdoc method
		 * @name deleteMasterDataItems
		 * @methodOf MasterDataItemService
		 * @params {array} masterDataItemsToDelete
		 * @description The method deletes the lists based on the lists index supplied.
		 */
		this.deleteMasterDataItems = function (masterDataItemsToDelete) {
			//since sending a body on DELETE is frowned upon, iterate through and send separate requests for each list to delete
			var deletePromises = [];
			var deleteResults = [];

			var addResultToArray = function (index, success) {
				//replace the initial promise with a new one that resolves with the data we just created
				deleteResults[index] = {
					'name': masterDataItemsToDelete[index].code,
					'success': success
				};
			};

			var doDeleteForIndex = angular.bind(this, function (index) {

				deletePromises[index] = this.masterDataItemEndpoint.delete(masterDataItemsToDelete[index].id, {offline: 'queue'}).then(function (response) {
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

			for (var i = 0; i < masterDataItemsToDelete.length; i++) {
				doDeleteForIndex(i);
			}

			return $q.all(deletePromises).then(function () {
				return deleteResults;
			});
		};


		/**
		 * @ngdoc method
		 * @name createMasterDataItem
		 * @methodOf MasterDataItemService
		 * @description The method creates the list by send a POST request to list Endpoint.
		 */
		this.createMasterDataItem = function (masterDataItem) {

			return this.masterDataItemEndpoint.post(masterDataItem, {offline: 'queue'}).then(angular.bind(this, function (response) {

				if (response.status == 'queue') {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('masterDataItem.createMasterDataItem.createQueued'),
						type: 'success',
						multiple: false
					});
				}
				else {
					if (response.data.code === 'duplicateCode') {
						WcAlertConsoleService.addMessage({
							message: $translate.instant('masterDataItem.createMasterDataItem.duplicateCode', {
								name: masterDataItem.code
							}),
							type: 'danger',
							multiple: false
						});
						return $q.reject('');
					} else {
						WcAlertConsoleService.addMessage({
							message: $translate.instant('masterDataItem.createMasterDataItem.createSuccess', {
								name: response.data.code
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
						message: $translate.instant('masterDataItem.createMasterDataItem.createFailed', {
							error: errorMsg.statusText
						}),
						type: 'danger',
						multiple: false
					});
				} else {			
					angular.forEach(errorMsg.data.failureList, function(failure) {
						WcAlertConsoleService.addMessage({
							message: $translate.instant('masterDataItem.createMasterDataItem.createFailed', {
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
         * @name updateMasterDataItem
         * @methodOf MasterDataItemService
         * @description The method updates the lists information to database.
         */
        this.updateMasterDataItem = function (masterDataItem) {
            var id = masterDataItem.id;

            return this.masterDataItemEndpoint.put(id, masterDataItem, {offline: 'queue'}).then(angular.bind(this, function (response) {

                if (response.status == 'queue') {
                    WcAlertConsoleService.addMessage({
                        message: $translate.instant('masterDataItem.editMasterDataItem.updateQueued', {
                            name: masterDataItem.code
                        }),
                        type: 'success',
                        multiple: false
                    });
                }
                else {
                    WcAlertConsoleService.addMessage({
                        message: $translate.instant('masterDataItem.editMasterDataItem.updateSuccess', {
                            name: masterDataItem.code
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

                    angular.forEach(error.data.failureList, function(failure) {
                        WcAlertConsoleService.addMessage({
                            message: $translate.instant('masterDataItem.editMasterDataItem.updateFailed', {
                                error: failure.message
                            }),
                            type: 'danger',
                            multiple: false
                        });
                    });
                    return $q.reject(error);

                } else {

                    WcAlertConsoleService.addMessage({
                        message: $translate.instant('masterDataItem.editMasterDataItem.updateFailed'),
                        type: 'danger',
                        multiple: false
                    });
                    return $q.reject(error);

                }
            }));
        };
		
	}]);
