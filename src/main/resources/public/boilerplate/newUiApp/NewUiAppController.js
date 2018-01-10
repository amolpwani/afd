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
	.controller('NewUiAppController', ['WcConstants', '$anchorScroll', '$timeout', function (WcConstants, $anchorScroll, $timeout) {

		this.version = angular.version;
		this.webCoreVersion = WcConstants.version;

		this.headerTemplateURL = 'newUiApp/newUiAppHeaderTemplate.html';

		/**
		 * @ngdoc method
		 * @name scrollToContent
		 * @methodOf NewUiAppModule.controller:NewUiAppController
		 * @description
		 * The method provides scroll option across all the pages based on HTML element id.
		 * Needed by the skip to content link to properly scroll to an id in an angular app
		 */
		this.scrollToContent = function () {
			$anchorScroll('content');
			//focus on first child of content that is focusable
			$timeout(function () {
				angular.element('#content input, #content textarea, #content select, #content button, #content a')[0].focus();
			}, 0);
		};
	}]);