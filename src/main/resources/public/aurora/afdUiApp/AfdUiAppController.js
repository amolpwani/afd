'use strict';

/**
 * @ngdoc controller
 * @module NewUiAppModule
 * @name NewUiAppController
 * @requires WcConstants
 * @requires $anchorScroll
 * @requires $timeout
 * @description
 * The NewUiAppController loads the angular version, webcore version and the templates for the application
 */

angular.module('NewUiAppModule')
	.controller('NewUiAppController', ['WcConstants', '$anchorScroll', '$timeout', '$state',
        function (WcConstants, $anchorScroll, $timeout, $state) {

		this.version = angular.version;
		this.webCoreVersion = WcConstants.version;


		this.headerTemplateURL = 'afdUiApp/afdUiAppHeaderTemplate.html';

		/*/!**
		 * @ngdoc method
		 * @name scrollToContent
		 * @methodOf AfdUiAppModule.controller:NewUiAppController
		 * @description
		 * The method provides scroll option across all the pages based on HTML element id.
		 * Needed by the skip to content link to properly scroll to an id in an angular app
		 ***!/*/
		this.scrollToContent = function () {
			$anchorScroll('content');
			//focus on first child of content that is focusable
			$timeout(function () {
				angular.element('#content input, #content textarea, #content select, #content button, #content a')[0].focus();
			}, 0);
		};
		
		/**
		 * @ngdoc method
		 * @name reloadState
		 * @methodOf JabUiAppController
		 * @params {object} processResultsFn
		 * @params {array} deleteResults
		 * @description The method reloads all the closed states based on the delete results value.
		 */
		this.reloadState = function(processResultsFn, deleteResults) {
			if(processResultsFn) {
				$state.params.processResultsFn = processResultsFn;
				$state.params.deleteResults = deleteResults;
			}
			//noinspection JSCheckFunctionSignatures
            $state.go($state.current.name, $state.params, {
				reload: true
			});
		};
	}]);
