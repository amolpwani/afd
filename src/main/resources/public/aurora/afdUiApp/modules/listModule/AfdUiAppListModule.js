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
			.state('list', {
				url: '/list',
				templateUrl: 'afdUiApp/modules/listModule/states/listState/list/listTemplate.html',
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
			.state('active-list', {
				url: '/active-list',
				templateUrl: 'afdUiApp/modules/listModule/states/listState/activeList/activeListTemplate.html',
				controller: 'ActiveListController',
				controllerAs: 'activeListController',
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
				templateUrl: 'afdUiApp/modules/listModule/states/listState/createList/createListTemplate.html',
				controller: 'CreateListController',
				controllerAs: 'createListController',
				parent: 'new-ui-app'
			})
			.state('listItem', {
				url: '/listItem:id',
				templateUrl: 'afdUiApp/modules/listModule/states/listItemState/listItem/listItemTemplate.html',
				controller: 'ListItemController',
				controllerAs: 'listItemController',
				parent: 'new-ui-app',
				resolve: {
					listItems: ['ListItemService', '$stateParams', function(ListItemService, $stateParams) {
						return ListItemService.getListItemsWithListId($stateParams.id);
					}]
				}
			})
			.state('create-listItem', {
				url: '/create-listItem:id',
				templateUrl: 'afdUiApp/modules/listModule/states/listItemState/createListItem/createListItemTemplate.html',
				controller: 'CreateListItemController',
				controllerAs: 'createListItemController',
				parent: 'new-ui-app'
			});
		}
	]);

