'use strict';

/**
 * @ngdoc module
 * @name AfdUiAppMasterDataItemModule
 * @requires WebCoreModule
 * @requires AfdUiAppMasterDataComponentsModule
 */
angular.module('AfdUiAppMasterDataItemModule', [
	'WebCoreModule',
	'AfdUiAppMasterDataItemComponentsModule'
]);

angular.module('AfdUiAppMasterDataItemModule')
	.config(['$urlRouterProvider', '$stateProvider',
		function($urlRouterProvider, $stateProvider) {

		$stateProvider
			.state('masterDataItem', {
				url: '/masterDataItem:id',
				templateUrl: 'afdUiApp/modules/masterDataItemModule/states/masterDataItem/masterDataItemTemplate.html',
				controller: 'MasterDataItemController',
				controllerAs: 'masterDataItemController',
				parent: 'afd-ui-app',
				resolve: {
					masterDataItems: ['MasterDataItemService', '$stateParams', function(MasterDataItemService, $stateParams) {
						return MasterDataItemService.getMasterDataItemsWithMasterDataId($stateParams.id);
					}]
				}
			})
			.state('create-masterDataItem', {
				url: '/create-masterDataItem:id',
				templateUrl: 'afdUiApp/modules/masterDataItemModule/states/createMasterDataItem/createMasterDataItemTemplate.html',
				controller: 'CreateMasterDataItemController',
				controllerAs: 'createMasterDataItemController',
				parent: 'afd-ui-app'
			});
		}
	]);

