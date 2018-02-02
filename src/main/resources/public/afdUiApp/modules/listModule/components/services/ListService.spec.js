'use strict';

describe('AfdUiAppListComponentsModule ListService:', function() {

	var ListService, WcHttpEndpointPrototype, $rootScope, $q, WcAlertConsoleService, $translate,
		$httpBackend, WcHttpRequestService, $state;

	var testListObject = {
		id: '1',
		name: 'List1',
		prepareForAction: function() {
			return true;
		}
	};

	beforeEach(function() {
		module('AfdUiAppListComponentsModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$q = $injector.get('$q');
			$translate = $injector.get('$translate');
			WcHttpEndpointPrototype = $injector.get('WcHttpEndpointPrototype');
			ListService = $injector.get('ListService');
			WcAlertConsoleService = $injector.get('WcAlertConsoleService');
			$httpBackend = $injector.get('$httpBackend');
			WcHttpRequestService = $injector.get('WcHttpRequestService');
			$state = $injector.get('$state');
		});

		WcHttpRequestService.configureDefaults({baseUrl: 'http://localhost:8081/'});
	});

	it('defines a ListService', function() {
		expect(ListService).toBeDefined();
	});

	describe('getLists(): ', function() {
		it('should use the WcHttpEndpointPrototype to request a list of lists', function() {
			var listTestData = [{name: 'Liist1'}, {name: 'List2'}];

			$httpBackend.whenGET('http://localhost:8081/listdata/getList').respond(200, listTestData);

			spyOn(ListService.listEndpoint, 'get').and.callThrough();

			var actualResult = null;
			ListService.getLists().then(function(lists) {
				actualResult = lists;
			});

			$httpBackend.flush();

			expect(ListService.listEndpoint.get).toHaveBeenCalledWith({cache: 'localStorage', alwaysRefresh: true});
			expect(actualResult).toEqual(listTestData);
		});

		it('should return an error if the request for list data fails', function() {
			$httpBackend.when('GET', 'unprotected/ping').respond(200, {});

			spyOn(ListService.listEndpoint, 'get').and.callFake(function() {
				return $q.reject('Error Message');
			});

			var actualResult = null;
			ListService.getLists().then(function() {
				console.log('This should not happen!');
			}, function(error) {
				actualResult = error;
			});

			$rootScope.$apply();

			expect(actualResult).toEqual('Error Message');
		});
	});

	describe('getList(): ', function() {
		it('should add a subroute onto the listEndpoint using the passed in id', function(){
			spyOn(ListService.listEndpoint, 'subRoute').and.callThrough();

			ListService.getList('123');
			//$httpBackend.flush();
			expect(ListService.listEndpoint.subRoute).toHaveBeenCalledWith('123');
		});

	});

	describe('deleteLists(): ', function() {
		it('should loop through the passed in list of lists, calling the delete endpoint for each', function(){
			spyOn(ListService.listEndpoint, 'delete').and.callFake(function() {
				return $q.when('test');
			});

			var testListsToDelete = [{id: '1', name:'List1'}, {id: '2', name:'List2'}];

			ListService.deleteLists(testListsToDelete);

			$rootScope.$apply();

			expect(ListService.listEndpoint.delete).toHaveBeenCalledWith('1', {offline: 'queue'});
			expect(ListService.listEndpoint.delete).toHaveBeenCalledWith('2', {offline: 'queue'});
		});

		it('in the success case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(ListService.listEndpoint, 'delete').and.callFake(function() {
				return $q.when('test');
			});

			var testListsToDelete = [{id: '1', name:'List1'}, {id: '2', name:'List2'}];

			ListService.deleteLists(testListsToDelete).then(function(results){
				expect(results).toEqual([{name:'List1', success: true}, {name:'List2', success: true}]);
			});

			$rootScope.$apply();
		});

		it('in the error case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(ListService.listEndpoint, 'delete').and.callFake(function() {
				return $q.reject('test');
			});

			var testListsToDelete = [{id: '1', name:'List1'}, {id: '2', name:'List2'}];

			ListService.deleteLists(testListsToDelete).then(function(results){
				expect(results).toEqual([{name:'List1', success: false}, {name:'List2', success: false}]);
			});

			$rootScope.$apply();
		});

		it('in offline queue case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(ListService.listEndpoint, 'delete').and.callFake(function() {
				return $q.when({status: 'queue'});
			});

			var testListsToDelete = [{id: '1', name:'List1'}, {id: '2', name:'List2'}];

			ListService.deleteLists(testListsToDelete).then(function(results){
				expect(results).toEqual([{name:'List1', success: 'queue'}, {name:'List2', success: 'queue'}]);
			});

			$rootScope.$apply();
		});
	});

	describe('createList():', function() {

		it('should send a POST to save a list, and when successful clear the list object', function() {
			spyOn(ListService.listEndpoint, 'post').and.callFake(function() {
				return $q.when({data : {name: 'test'}});
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});
			spyOn(WcAlertConsoleService, 'addMessage');

			ListService.createList(testListObject);

			$rootScope.$apply();

			expect(ListService.listEndpoint.post).toHaveBeenCalledWith(testListObject, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'success', multiple: false});
		});

		it('should send a POST to save a list, and when the request is queued clear the list object', function() {
			spyOn(ListService.listEndpoint, 'post').and.callFake(function() {
				return $q.when({status: 'queue'});
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test queue';
			});

			spyOn(WcAlertConsoleService, 'addMessage');

			ListService.createList(testListObject);

			$rootScope.$apply();

			expect(ListService.listEndpoint.post).toHaveBeenCalledWith(testListObject, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test queue', type: 'success', multiple: false});
		});


		it('should add an error message to the message queue if the post fails, and should not clear the list object', function() {
			spyOn(ListService.listEndpoint, 'post').and.callFake(function() {
				return $q.reject('test');
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});
			spyOn(WcAlertConsoleService, 'addMessage');

			ListService.createList(testListObject);

			$rootScope.$apply();

			expect(ListService.listEndpoint.post).toHaveBeenCalled();
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'danger', multiple: false});
		});

	});

	describe('updateList():', function() {

		it('should attempt to update a list and create a success alert if the request succeeds', function() {
			var testList = {name: 'List1', id: '1'};
			var testListId = testList.id;

			spyOn(ListService.listEndpoint, 'put').and.callFake(function() {
				return $q.when({data : {name: 'test'}});
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});

			//update to use new function signature, passing in the booking
			ListService.updateList(testList);

			$rootScope.$apply();

			delete testList.id;

			expect(ListService.listEndpoint.put).toHaveBeenCalledWith(testListId, testList, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'success', multiple: false});
		});

		it('should attempt to update a list and create a queued alert if the request is queued', function() {
			var testList = {name: 'List1', id: '1'};
			var testListId = testList.id;

			spyOn(ListService.listEndpoint, 'put').and.callFake(function() {
				return $q.when('queue');
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test queue';
			});

			ListService.updateList(testList);

			$rootScope.$apply();

			delete testList.id;

			expect(ListService.listEndpoint.put).toHaveBeenCalledWith(testListId, testList, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test queue', type: 'success', multiple: false});
		});

		it('should put a message on the screen in the error case if the status code is not 409 and should reject the promise with the error object', function(){
			var testList = {name: 'List1', id: '1'};

			spyOn(ListService.listEndpoint, 'put').and.callFake(function() {
				return $q.reject({status: 'not409'});
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});

			ListService.updateList(testList).then(function(){}, function(error){
				expect(error).toEqual({status: 'not409'});
			});

			$rootScope.$apply();
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalled();
		});
	});
});
