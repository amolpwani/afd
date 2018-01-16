'use strict';

//noinspection JSValidateJSDoc
/**
 * @ngdoc controller
 * @module AfdUiAppListComponentsModule
 * @name ListItemService
 * @description This service holds all the list related properties and methods.
 * @requires $q
 * @requires $state
 * @requires $translate
 * @requires WcHttpEndpointPrototype
 * @requires WcAlertConsoleService
 * @requires ConflictNotificationModalService
 * */
angular.module('AfdUiAppListModule').service('ListItemService', ['$q', '$state', '$translate', 'WcHttpEndpointPrototype', 'WcAlertConsoleService',
	function ($q, $state, $translate, WcHttpEndpointPrototype, WcAlertConsoleService) {

		//noinspection JSValidateJSDoc
		/**
		 * @ngdoc property
		 * @name listItemEndpoint
		 * @propertyOf ListItemService
		 * @type {WcHttpEndpointPrototype|*}
		 * @description This property holds the object for Http end point.
		 */
		this.listItemEndpoint = new WcHttpEndpointPrototype('listdataitems/getItems');
		this.listItemListIdEndpoint = new WcHttpEndpointPrototype('listdataitems/getListId');

		/**
		 * @ngdoc method
		 * @name getListItemItems
		 * @methodOf ListItemService
		 * @returns {*} response object representing the offersEndpoint GET response
		 * @description The method get the list details from the list end point.
		 */
		this.getListItems = function () {
			return this.listItemEndpoint.get({cache: 'localStorage', alwaysRefresh: true}).then(function (response) {
				return response.data;
			}, function(error) {
				return $q.reject(error);
			});
		};
		
		/**
		 * @ngdoc method
		 * @name getListItemItems
		 * @methodOf ListItemService
		 * @params {integer} listId
		 * @returns {*} response object representing the offersEndpoint GET response
		 * @description The method get the list details from the list end point.
		 */
		this.getListItemsWithListId = function (listId) {
			return this.listItemListIdEndpoint.subRoute(listId).get({cache: 'localStorage', alwaysRefresh: true}).then(function (response) {
				return response.data;
			}, function(error) {
				return $q.reject(error);
			});
		};

		/**
		 * @ngdoc method
		 * @name getListItem
		 * @methodOf ListItemService
		 * @params {integer} listId
		 * @description The method gets the list information using GET request to list Endpoint.
		 */
		this.getListItem = function (id) {
			return this.listItemEndpoint.subRoute(id).get({cache: 'localStorage', alwaysRefresh: true}).then(function (response) {
				return response.data;
			}, function (error) {
				return $q.reject(error);
			});
		};

		/**
		 * @ngdoc method
		 * @name deleteListItems
		 * @methodOf ListItemService
		 * @params {array} listItemsToDelete
		 * @description The method deletes the lists based on the lists index supplied.
		 */
		this.deleteListItems = function (listItemsToDelete) {
			//since sending a body on DELETE is frowned upon, iterate through and send separate requests for each list to delete
			var deletePromises = [];
			var deleteResults = [];

			var addResultToArray = function (index, success) {
				//replace the initial promise with a new one that resolves with the data we just created
				deleteResults[index] = {
					'id': listItemsToDelete[index].id,
					'success': success
				};
			};

			var doDeleteForIndex = angular.bind(this, function (index) {

				deletePromises[index] = this.listItemEndpoint.delete(listItemsToDelete[index].id, {offline: 'queue'}).then(function (response) {
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

			for (var i = 0; i < listItemsToDelete.length; i++) {
				doDeleteForIndex(i);
			}

			return $q.all(deletePromises).then(function () {
				return deleteResults;
			});
		};


		/**
		 * @ngdoc method
		 * @name createListItem
		 * @methodOf ListItemService
		 * @description The method creates the list by send a POST request to list Endpoint.
		 */
		this.createListItem = function (listItem) {

			return this.listItemEndpoint.post(listItem, {offline: 'queue'}).then(angular.bind(this, function (response) {

				if (response.status == 'queue') {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('list.createListItem.createQueued'),
						type: 'success',
						multiple: false
					});
				}
				else {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('listItem.createListItem.createSuccess', {
							name: response.data.code
						}),
						type: 'success',
						multiple: false
					});
				}
				return $q.when(response.data);
			}), function (errorMsg) {
				
				if (errorMsg.status != 422) {
					WcAlertConsoleService.addMessage({
						message: $translate.instant('listItem.createListItem.createFailed', {
							error: errorMsg.statusText
						}),
						type: 'danger',
						multiple: false
					});
				} else {			
					angular.forEach(errorMsg.data.failureList, function(failure) {
						WcAlertConsoleService.addMessage({
							message: $translate.instant('listItem.createListItem.createFailed', {
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
         * @name updateListItem
         * @methodOf ListItemService
         * @description The method updates the lists information to database.
         */
        this.updateListItem = function (listItem) {
            var id = listItem.id;

            return this.listItemEndpoint.put(id, listItem, {offline: 'queue'}).then(angular.bind(this, function (response) {

                if (response.status == 'queue') {
                    WcAlertConsoleService.addMessage({
                        message: $translate.instant('listItem.editListItem.updateQueued', {
                            name: listItem.code
                        }),
                        type: 'success',
                        multiple: false
                    });
                }
                else {
                    WcAlertConsoleService.addMessage({
                        message: $translate.instant('listItem.editListItem.updateSuccess', {
                            name: listItem.code
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
                            message: $translate.instant('listItem.editListItem.updateFailed', {
                                error: failure.message
                            }),
                            type: 'danger',
                            multiple: false
                        });
                    });
                    return $q.reject(error);

                } else {

                    WcAlertConsoleService.addMessage({
                        message: $translate.instant('listItem.editListItem.updateFailed'),
                        type: 'danger',
                        multiple: false
                    });
                    return $q.reject(error);

                }
            }));
        };
		
	}]);
