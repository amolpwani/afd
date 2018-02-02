'use strict';

describe('AfdUiAppListItemComponentsModule ListItemService:', function() {

	var ListItemService, WcHttpEndpointPrototype, $rootScope, $q, WcAlertConsoleService, $translate,
		$httpBackend, WcHttpRequestService, $state;

	var testListItemObject = {
		id: '1',
		code: 'ListItem1',
		prepareForAction: function() {
			return true;
		}
	};

	beforeEach(function() {
		module('AfdUiAppListItemComponentsModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$q = $injector.get('$q');
			$translate = $injector.get('$translate');
			WcHttpEndpointPrototype = $injector.get('WcHttpEndpointPrototype');
			ListItemService = $injector.get('ListItemService');
			WcAlertConsoleService = $injector.get('WcAlertConsoleService');
			$httpBackend = $injector.get('$httpBackend');
			WcHttpRequestService = $injector.get('WcHttpRequestService');
			$state = $injector.get('$state');
		});

		WcHttpRequestService.configureDefaults({baseUrl: 'http://localhost:8081/'});
	});

	it('defines a ListItemService', function() {
		expect(ListItemService).toBeDefined();
	});

	describe('getListItems(): ', function() {
		it('should use the WcHttpEndpointPrototype to request a list of listItems', function() {
			var listTestData = [{code: 'ListItem1'}, {code: 'ListItem2'}];

			$httpBackend.whenGET('http://localhost:8081/listdataitems/getItems').respond(200, listTestData);

			spyOn(ListItemService.listItemEndpoint, 'get').and.callThrough();

			var actualResult = null;
			ListItemService.getListItems().then(function(lists) {
				actualResult = lists;
			});

			$httpBackend.flush();

			expect(ListItemService.listItemEndpoint.get).toHaveBeenCalledWith({cache: 'localStorage', alwaysRefresh: true});
			expect(actualResult).toEqual(listTestData);
		});

		it('should return an error if the request for listItem data fails', function() {
			$httpBackend.when('GET', 'unprotected/ping').respond(200, {});

			spyOn(ListItemService.listItemEndpoint, 'get').and.callFake(function() {
				return $q.reject('Error Message');
			});

			var actualResult = null;
			ListItemService.getListItems().then(function() {
				console.log('This should not happen!');
			}, function(error) {
				actualResult = error;
			});

			$rootScope.$apply();

			expect(actualResult).toEqual('Error Message');
		});
	});

	describe('getListItem(): ', function() {
		it('should add a subroute onto the listItemEndpoint using the passed in id', function(){
			spyOn(ListItemService.listItemEndpoint, 'subRoute').and.callThrough();

			ListItemService.getListItem('123');
			//$httpBackend.flush();
			expect(ListItemService.listItemEndpoint.subRoute).toHaveBeenCalledWith('123');
		});

	});

	describe('deleteListItems(): ', function() {
		it('should loop through the passed in list of listItems, calling the delete endpoint for each', function(){
			spyOn(ListItemService.listItemEndpoint, 'delete').and.callFake(function() {
				return $q.when('test');
			});

			var deleteListItemsToDelete =[{id: '1', code:'List Item1'}, {id: '2', code:'List Item2'}];

			ListItemService.deleteListItems(deleteListItemsToDelete);

			$rootScope.$apply();

			expect(ListItemService.listItemEndpoint.delete).toHaveBeenCalledWith('1', {offline: 'queue'});
			expect(ListItemService.listItemEndpoint.delete).toHaveBeenCalledWith('2', {offline: 'queue'});
		});

		it('in the success case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(ListItemService.listItemEndpoint, 'delete').and.callFake(function() {
				return $q.when('test');
			});

			var deleteListItemsToDelete =[{id: '1', code:'List Item1'}, {id: '2', code:'List Item2'}];

			ListItemService.deleteListItems(deleteListItemsToDelete).then(function(results){
				expect(results).toEqual([{name:'List Item1', success: true}, {name:'List Item2', success: true}]);
			});

			$rootScope.$apply();
		});

		it('in the error case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(ListItemService.listItemEndpoint, 'delete').and.callFake(function() {
				return $q.reject('test');
			});

			var deleteListItemsToDelete =[{id: '1', code:'List Item1'}, {id: '2', code:'List Item2'}];

			ListItemService.deleteListItems(deleteListItemsToDelete).then(function(results){
				expect(results).toEqual([{name:'List Item1', success: false}, {name:'List Item2', success: false}]);
			});

			$rootScope.$apply();
		});

		it('in offline queue case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(ListItemService.listItemEndpoint, 'delete').and.callFake(function() {
				return $q.when({status: 'queue'});
			});

			var deleteListItemsToDelete =[{id: '1', code:'List Item1'}, {id: '2', code:'List Item2'}];

			ListItemService.deleteListItems(deleteListItemsToDelete).then(function(results){
				expect(results).toEqual([{name:'List Item1', success: 'queue'}, {name:'List Item2', success: 'queue'}]);
			});

			$rootScope.$apply();
		});
	});

	describe('createListItem():', function() {

		it('should send a POST to save a listItem, and when successful clear the listItem object', function() {
			spyOn(ListItemService.listItemEndpoint, 'post').and.callFake(function() {
				return $q.when({data : {code: 'test'}});
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});
			spyOn(WcAlertConsoleService, 'addMessage');

			ListItemService.createListItem(testListItemObject);

			$rootScope.$apply();

			expect(ListItemService.listItemEndpoint.post).toHaveBeenCalledWith(testListItemObject, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'success', multiple: false});
		});

		it('should send a POST to save a listItem, and when the request is queued clear the listItem object', function() {
			spyOn(ListItemService.listItemEndpoint, 'post').and.callFake(function() {
				return $q.when({status: 'queue'});
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test queue';
			});

			spyOn(WcAlertConsoleService, 'addMessage');

			ListItemService.createListItem(testListItemObject);

			$rootScope.$apply();

			expect(ListItemService.listItemEndpoint.post).toHaveBeenCalledWith(testListItemObject, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test queue', type: 'success', multiple: false});
		});


		it('should add an error message to the message queue if the post fails, and should not clear the listItem object', function() {
			spyOn(ListItemService.listItemEndpoint, 'post').and.callFake(function() {
				return $q.reject('test');
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});
			spyOn(WcAlertConsoleService, 'addMessage');

			ListItemService.createListItem(testListItemObject);

			$rootScope.$apply();

			expect(ListItemService.listItemEndpoint.post).toHaveBeenCalled();
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'danger', multiple: false});
		});

	});

	describe('updateListItem():', function() {

		it('should attempt to update a list and create a success alert if the request succeeds', function() {
			var testListItem = {code: 'ListItem1', id: '1'};
			var testListItemId = testListItem.id;

			spyOn(ListItemService.listItemEndpoint, 'put').and.callFake(function() {
				return $q.when('test');
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});

			//update to use new function signature, passing in the booking
			ListItemService.updateListItem(testListItem);

			$rootScope.$apply();

			delete testListItem.id;

			expect(ListItemService.listItemEndpoint.put).toHaveBeenCalledWith(testListItemId, testListItem, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'success', multiple: false});
		});

		it('should attempt to update a list and create a queued alert if the request is queued', function() {
			var testListItem = {code: 'ListItem1', id: '1'};
			var testListItemId = testListItem.id;

			spyOn(ListItemService.listItemEndpoint, 'put').and.callFake(function() {
				return $q.when('queue');
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test queue';
			});

			ListItemService.updateListItem(testListItem);

			$rootScope.$apply();

			delete testListItem.id;

			expect(ListItemService.listItemEndpoint.put).toHaveBeenCalledWith(testListItemId, testListItem, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test queue', type: 'success', multiple: false});
		});

		it('should put a message on the screen in the error case if the status code is not 409 and should reject the promise with the error object', function(){
			var testListItem = {code: 'ListItem1', id: '1'};

			spyOn(ListItemService.listItemEndpoint, 'put').and.callFake(function() {
				return $q.reject({status: 'not409'});
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});

			ListItemService.updateListItem(testListItem).then(function(){}, function(error){
				expect(error).toEqual({status: 'not409'});
			});

			$rootScope.$apply();
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalled();
		});
	});
});
