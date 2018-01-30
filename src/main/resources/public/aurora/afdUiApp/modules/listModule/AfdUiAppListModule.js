'use strict';

/**
 * @ngdoc module
 * @name AfdUiAppListModule
 * @requires WebCoreModule
 * @requires AfdUiAppListComponentsModule
 */
angular.module('AfdUiAppListModule', [
	'WebCoreModule',
	'AfdUiAppListComponentsModule'
]);

angular.module('AfdUiAppListModule')
	.config(['$urlRouterProvider', '$stateProvider',
		function($urlRouterProvider, $stateProvider) {

		$stateProvider
			.state('list', {
				url: '/list',
				templateUrl: 'afdUiApp/modules/listModule/states/list/listTemplate.html',
				controller: 'ListController',
				controllerAs: 'listController',
				parent: 'afd-ui-app',
				resolve: {
					lists: ['ListService', function(ListService) {
						return ListService.getLists();
					}]
				},
				onEnter: ['$state', function($state) {
					if($state.params.processResultsFn) {
						$state.params.processResultsFn($state.params.deleteResults);
					}
				}]
			})
			.state('active-list', {
				url: '/active-list',
				templateUrl: 'afdUiApp/modules/listModule/states/activeList/activeListTemplate.html',
				controller: 'ActiveListController',
				controllerAs: 'activeListController',
				parent: 'afd-ui-app',
				resolve: {
					lists: ['ListService', function(ListService) {
						return ListService.getLists();
					}]
				},
				onEnter: ['$state', function($state) {
					if($state.params.processResultsFn) {
						$state.params.processResultsFn($state.params.deleteResults);
					}
				}]
			})
			.state('create-list', {
				url: '/create-list',
				templateUrl: 'afdUiApp/modules/listModule/states/createList/createListTemplate.html',
				controller: 'CreateListController',
				controllerAs: 'createListController',
				parent: 'afd-ui-app'
			});
		}
	]);
