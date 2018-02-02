'use strict';

/**
 * @ngdoc module
 * @name AfdUiAppListItemModule
 * @requires WebCoreModule
 * @requires AfdUiAppListComponentsModule
 */
angular.module('AfdUiAppListItemModule', [
	'WebCoreModule',
	'AfdUiAppListItemComponentsModule'
]);

angular.module('AfdUiAppListItemModule')
	.config(['$urlRouterProvider', '$stateProvider',
		function($urlRouterProvider, $stateProvider) {

		$stateProvider
			.state('listItem', {
				url: '/listItem:id',
				templateUrl: 'afdUiApp/modules/listItemModule/states/listItem/listItemTemplate.html',
				controller: 'ListItemController',
				controllerAs: 'listItemController',
				parent: 'afd-ui-app',
				resolve: {
					listItems: ['ListItemService', '$stateParams', function(ListItemService, $stateParams) {
						return ListItemService.getListItemsWithListId($stateParams.id);
					}]
				}
			})
			.state('create-listItem', {
				url: '/create-listItem:id',
				templateUrl: 'afdUiApp/modules/listItemModule/states/createListItem/createListItemTemplate.html',
				controller: 'CreateListItemController',
				controllerAs: 'createListItemController',
				parent: 'afd-ui-app'
			});
		}
	]);

