'use strict';

/**
 * @ngdoc module
 * @name AfdUiAppListModule
 * @description The new taxonomy module
 * @requires WebCoreModule
 * @requires AfdUiAppListComponentsModule
 */
angular.module('AfdUiAppListModule', [
	'WebCoreModule',
	'AfdUiAppListComponentsModule'
]);

/*
 * New Taxonomy module configuration
 */
angular.module('AfdUiAppListModule')
	.config(['$urlRouterProvider', '$stateProvider',
		function($urlRouterProvider, $stateProvider) {
		
		$urlRouterProvider
		.when('', '/list')
		.when('/', '/list');

		$stateProvider
			.state('child-menu-item', {
				url: '/child-menu-item',
				templateUrl: 'afdUiApp/modules/listmodule/states/newScreen/listView.html',
				controller: 'NewScreenController',
				controllerAs: 'newScreenController',
				parent: 'new-ui-app'
			})
			.state('list', {
				url: '/list',
				templateUrl: 'afdUiApp/modules/listModule/states/list/listTemplate.html',
				controller: 'ListController',
				controllerAs: 'listController',
				parent: 'new-ui-app',
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
				parent: 'new-ui-app'
			});
		}
	]);

