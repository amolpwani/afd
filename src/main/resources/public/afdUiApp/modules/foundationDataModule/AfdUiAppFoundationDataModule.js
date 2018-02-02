'use strict';

/**
 * @ngdoc module
 * @name AfdUiAppFoundationDataModule
 * @requires WebCoreModule
 * @requires AfdUiAppFoundationDataComponentsModule
 */
angular.module('AfdUiAppFoundationDataModule', [
	'WebCoreModule',
	'AfdUiAppFoundationDataComponentsModule'
]);

angular.module('AfdUiAppFoundationDataModule')
	.config(['$urlRouterProvider', '$stateProvider',
		function($urlRouterProvider, $stateProvider) {

		$stateProvider
			.state('foundationData', {
				url: '/foundationData',
				templateUrl: 'afdUiApp/modules/foundationDataModule/states/foundationData/foundationDataTemplate.html',
				controller: 'FoundationDataController',
				controllerAs: 'FoundationDataController',
				parent: 'afd-ui-app',
				resolve: {
					foundationDatas: ['foundationDataService', function(foundationDataService) {
						return foundationDataService.getfoundationDatas();
					}]
				},
				onEnter: ['$state', function($state) {
					if($state.params.processResultsFn) {
						$state.params.processResultsFn($state.params.deleteResults);
					}
				}]
			})
			.state('create-foundationData', {
				url: '/create-foundationData',
				templateUrl: 'afdUiApp/modules/foundationDataModule/states/createfoundationData/createfoundationDataTemplate.html',
				controller: 'CreateFoundationDataController',
				controllerAs: 'createFoundationDataController',
				parent: 'afd-ui-app',
				resolve: {
					lists: ['ListService', function(ListService) {
						return ListService.getLists();
					}]
				}
			});
		}
	]);

