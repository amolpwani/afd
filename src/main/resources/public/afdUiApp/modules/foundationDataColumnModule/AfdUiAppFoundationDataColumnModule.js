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
				}],
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
		.state('create-foundationDataColumn', {
			url: '/create-foundationDataColumn',
			templateUrl: 'afdUiApp/modules/foundationDataColumnModule/states/createFoundationDataColumn/createFoundationDataColumnTemplate.html',
			controller: 'CreateFoundationDataColumnController',
			controllerAs: 'createFoundationDataColumnController',
			parent: 'afd-ui-app',
			resolve: {
				lists: ['ListService', function(ListService) {
					return ListService.getLists();
				}],
				foundationDataColumns: ['FoundationDataColumnService', function(FoundationDataColumnService) {
					return FoundationDataColumnService.getFoundationDataColumns();
				}]
			}
		});
	}
]);

angular.module('AfdUiAppFoundationDataColumnModule').directive('dynamicTable', function() {
	return {
		restrict: 'A',
		//The directive needs to have a priority > 0 to make it run before the ohter. This one is set to 100 in the
		//event there are other directives that have priority > 0 being loaded on the page.
		priority: 100,
        require: ['dynamicTable', '^wcResponsiveTable'],
		bindToController: {
            dynamicTable: '='
		},
		controller: ['$element', function($element) {

			var tableHeaderCells = [];
			var tableBodyCells = [];

			//Loop over all the column objects that you passed in to the dynamicTable attribute
			angular.forEach(this.dynamicTable, function(column) {
				//Create the header cell
                var tableHeaderCell = $('<th />');

                //Add the appropriate content for the cell
                if (column.name == 'Actions') {
                	tableHeaderCell.append(column.name);
                }

				//Add the appropriate attributes/content for the cell if you want sorting/filtering
            	if(column.sort.enabled) {
                    tableHeaderCell.attr(column.sort.attributes);
				}
            	
            	if (column.name !== 'Actions') {
	            	tableHeaderCell.append('<div><a style="color: #fff;" ng-click="foundationDataColumnController.updateSelectedFoundationDataColumn(' + column.id + ')">Edit</a> <a style="color: #fff;" ng-click="foundationDataColumnController.deleteFoundationDataColumn(' + column.id + ')">Delete</a></div>');
            		//tableHeaderCell.append('<div><a style="color: #fff;" ui-sref="update-foundationDataColumn({id:' + column.id + '})">Edit</a></div>');
            	}

				if(column.filter.enabled) {
                    tableHeaderCell.append($(column.filter.label));
                    tableHeaderCell.append($(column.filter.field));
				}

				//Create the data cell
                var tableBodyCell = $('<td />');

				//Add the appropriate attributes/content for the cell if you want to use ngBind or the expression language for the data binging
                if(column.useNgBind) {
                    tableBodyCell.attr('ng-bind', column.binding);
				} else {
                	//This assumes the binding is defined using the double curly braces syntax
                    tableBodyCell.append(column.binding);
				}

				//Add each header/data cell to an array for later use
				tableHeaderCells.push(tableHeaderCell);
				tableBodyCells.push(tableBodyCell);
			});

			//Create the table template
			var template = angular.element(
				'<table class="table table-striped table-bordered">' +
					'<thead>' +
						'<tr>' +
						'</tr>' +
					'</thead>' +
					'<tbody>' +
						'<tr>' +
						'</tr>' +
					'</tbody>' +
				'</table>'
			);

			//Add the header/data cells to the table tempalte
			template.find('thead tr').append(tableHeaderCells);
            template.find('tbody tr').append(tableBodyCells);

            //Add the table to the wcResponsiveTable element
			$element.append(template);
        }]
	};
});

/**
 * @ngdoc directive
 * @name AfdUiAppFoundationDataColumnModule.directive:dynamicTableWrapper
 * @restrict A
 * @element div
 * @description
 * The dynamicTableWrapper directive is responsible for compiling the base <table> template generated from the
 * dynamicTable directive. This directive needs to be placed on a element that is a parent of the dynamicTable.
 */
angular.module('AfdUiAppFoundationDataColumnModule').directive('dynamicTableWrapper', ['$compile', function($compile) {
    return {
        restrict: 'A',
        link: function (scope, element) {
        	//Find the table that was generated from the above directive
            var table = element.find('table');

            //Compile the table, as the wcResponsiveTable directive has already loaded so any directives on the table still need to be compiled to run
            $compile(table)(scope);
        }
    };
}]);


