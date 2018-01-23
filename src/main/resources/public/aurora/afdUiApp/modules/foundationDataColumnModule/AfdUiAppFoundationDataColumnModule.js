'use strict';

/**
 * @ngdoc module
 * @name AfdUiAppFoundationDataColumnModule
 * @requires WebCoreModule
 * @requires AfdUiAppFoundationDataColumnComponentsModule
 */
angular.module('AfdUiAppFoundationDataColumnModule', [
	'WebCoreModule',
	'AfdUiAppFoundationDataColumnComponentsModule'
]);

angular.module('AfdUiAppFoundationDataColumnModule')
	.config(['$urlRouterProvider', '$stateProvider',
		function($urlRouterProvider, $stateProvider) {

		$stateProvider
			.state('foundationDataColumn', {
				url: '/foundationDataColumn',
				templateUrl: 'afdUiApp/modules/foundationDataColumnModule/states/foundationDataColumn/foundationDataColumnTemplate.html',
				controller: 'FoundationDataColumnController',
				controllerAs: 'foundationDataColumnController',
				parent: 'afd-ui-app',
				resolve: {
					foundationDataColumns: ['FoundationDataColumnService', function(FoundationDataColumnService) {
						return FoundationDataColumnService.getFoundationDataColumns();
					}]
				},
				onEnter: ['$state', function($state) {
					if($state.params.processResultsFn) {
						$state.params.processResultsFn($state.params.deleteResults);
					}
				}]
			})
			.state('create-foundationDataColumn', {
				url: '/create-foundationDataColumn',
				templateUrl: 'afdUiApp/modules/foundationDataColumnModule/states/createFoundationDataColumn/createFoundationDataColumnTemplate.html',
				controller: 'CreateFoundationDataColumnController',
				controllerAs: 'createFoundationDataColumnController',
				parent: 'afd-ui-app',
				resolve: {
					lists: ['ListService', function(ListService) {
						return ListService.getLists();
					}]
				}
			});
		}
	]);
