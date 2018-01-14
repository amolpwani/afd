'use strict';

/**
 * @ngdoc module
 * @name AfdUiAppListItemModule
 * @description The new taxonomy module
 * @requires WebCoreModule
 * @requires AfdUiAppListItemComponentsModule
 */
angular.module('AfdUiAppListItemModule', [
	'WebCoreModule',
	'AfdUiAppListItemComponentsModule'
]);

/*
 * New Taxonomy module configuration
 */
angular.module('AfdUiAppListItemModule')
	.config(['$urlRouterProvider', '$stateProvider',
		function($urlRouterProvider, $stateProvider) {
		
		$urlRouterProvider
		.when('', '/listItem')
		.when('/', '/listItem');

		$stateProvider
			.state('listItem', {
				url: '/listItem',
				templateUrl: 'afdUiApp/modules/listItemModule/states/listItem/listItemTemplate.html',
				controller: 'ListItemController',
				controllerAs: 'listItemController',
				parent: 'new-ui-app',
				resolve: {
					lists: ['ListItemService', function(ListService) {
						return ListItemService.getListItems();
					}]
				},
				onEnter: ['$state', function($state) {
					if($state.params.processResultsFn) {
						$state.params.processResultsFn($state.params.deleteResults);
					}
				}]
			})
			.state('create-listItem', {
				url: '/create-listItemm',
				templateUrl: 'afdUiApp/modules/listItemModule/states/createListItem/createListItemTemplate.html',
				controller: 'CreateListItemController',
				controllerAs: 'createListItemController',
				parent: 'new-ui-app'
			});
		}
	]);

