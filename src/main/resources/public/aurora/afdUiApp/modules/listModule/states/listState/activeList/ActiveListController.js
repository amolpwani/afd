'use strict';

//noinspection JSValidateJSDoc
/**
			 * @ngdoc controller
			 * @module AfdUiAppListModule
			 * @name ActiveListController
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
	.controller('ActiveListController', ['ListService', 'lists', '$scope', 'WcAlertConsoleService', '$translate', '$state',
		function(ListService, lists, $scope, WcAlertConsoleService, $translate, $state) {

			//noinspection JSValidateJSDoc
            /**
			 * @ngdoc property
			 * @name lists
			 * @propertyOf ActiveListController
			 * @type {array}
			 * @description This property holds the list of lists.
			 */
			this.lists = lists;
	}
			
	]);
