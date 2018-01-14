/**
 * @ngdoc controller
 * @module NewUiAppNewAdminModule
 * @name HomeController
 * @description
 * The HomeController is the starting point of the application, when the application starts this controller will be called first.
 */

'use strict';

angular.module('NewUiAppNewAdminModule')
	.controller('ListScreenController',function($scope, $state, $stateParams, ListDataItems) {
	      $scope.newlists = [{"name":"List1", "active" : true}, {"name":"List2", "active" : false}];//ListData.query();
	      $scope.listdata = new ListDataItems();
	      $scope.createListData = function() {
	      $scope.listdata.$save(function() {
		      $state.go('admin-menu-item');
		      });
	      };
	  });