'use strict';

/**
 * @ngdoc module
 * @name AfdUiAppMasterDataModule
 * @requires WebCoreModule
 * @requires AfdUiAppMasterDataComponentsModule
 */
angular.module('AfdUiAppMasterDataModule', [
	'WebCoreModule',
	'AfdUiAppMasterDataComponentsModule'
]);

angular.module('AfdUiAppMasterDataModule')
	.config(['$urlRouterProvider', '$stateProvider',
		function($urlRouterProvider, $stateProvider) {

		$stateProvider
			.state('masterData', {
				url: '/masterData',
				templateUrl: 'afdUiApp/modules/masterDataModule/states/masterData/masterDataTemplate.html',
				controller: 'MasterDataController',
				controllerAs: 'masterDataController',
				parent: 'afd-ui-app',
				resolve: {
					masterDataList: ['MasterDataService', function(MasterDataService) {
						return MasterDataService.getMasterDatas();
					}]
				},
				onEnter: ['$state', function($state) {
					if($state.params.processResultsFn) {
						$state.params.processResultsFn($state.params.deleteResults);
					}
				}]
			})
			.state('active-masterData', {
				url: '/active-masterData',
				templateUrl: 'afdUiApp/modules/masterDataModule/states/activeMasterData/activeMasterDataTemplate.html',
				controller: 'ActiveMasterDataController',
				controllerAs: 'activeMasterDataController',
				parent: 'afd-ui-app',
				resolve: {
					masterDatas: ['MasterDataService', function(MasterDataService) {
						return MasterDataService.getMasterDatas();
					}]
				},
				onEnter: ['$state', function($state) {
					if($state.params.processResultsFn) {
						$state.params.processResultsFn($state.params.deleteResults);
					}
				}]
			})
			.state('create-masterData', {
				url: '/create-masterData',
				templateUrl: 'afdUiApp/modules/masterDataModule/states/createMasterData/createMasterDataTemplate.html',
				controller: 'CreateMasterDataController',
				controllerAs: 'createMasterDataController',
				parent: 'afd-ui-app'
			});
		}
	]);
