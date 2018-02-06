'use strict';

//noinspection JSValidateJSDoc
/**
			 * @ngdoc controller
			 * @module AfdUiAppMasterDataModule
			 * @name ActiveMasterDataController
			 * @description This controller holds the methods and properties for list masterDatas.
			 * @requires MasterDataService
			 * @requires $filter
			 * @requires masterDatas
			 * @requires $scope
			 * @requires WcAlertConsoleService
			 * @requires $translate
			 * @requires $state
			 * @requires WcDataTableService
			 * @requires $timeout
			 * */
angular.module('AfdUiAppMasterDataModule')
	.controller('ActiveMasterDataController', ['MasterDataService', 'masterDatas', '$scope', 'WcAlertConsoleService', '$translate', '$state',
		function(MasterDataService, masterDatas, $scope, WcAlertConsoleService, $translate, $state) {

			//noinspection JSValidateJSDoc
            /**
			 * @ngdoc property
			 * @name masterDatas
			 * @propertyOf ActiveMasterDataController
			 * @type {array}
			 * @description This property holds the list of masterDatas.
			 */
			this.masterDatas = masterDatas;
	}
			
	]);
