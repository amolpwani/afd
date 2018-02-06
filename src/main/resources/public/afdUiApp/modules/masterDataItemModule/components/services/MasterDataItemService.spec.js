'use strict';

describe('AfdUiAppMasterDataItemComponentsModule MasterDataItemService:', function() {

	var MasterDataItemService, WcHttpEndpointPrototype, $rootScope, $q, WcAlertConsoleService, $translate,
		$httpBackend, WcHttpRequestService, $state;

	var testMasterDataItemObject = {
		id: '1',
		code: 'MasterDataItem1',
		prepareForAction: function() {
			return true;
		}
	};

	beforeEach(function() {
		module('AfdUiAppMasterDataItemComponentsModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$q = $injector.get('$q');
			$translate = $injector.get('$translate');
			WcHttpEndpointPrototype = $injector.get('WcHttpEndpointPrototype');
			MasterDataItemService = $injector.get('MasterDataItemService');
			WcAlertConsoleService = $injector.get('WcAlertConsoleService');
			$httpBackend = $injector.get('$httpBackend');
			WcHttpRequestService = $injector.get('WcHttpRequestService');
			$state = $injector.get('$state');
		});

		WcHttpRequestService.configureDefaults({baseUrl: 'http://localhost:8081/'});
	});

	it('defines a MasterDataItemService', function() {
		expect(MasterDataItemService).toBeDefined();
	});

	describe('getMasterDataItems(): ', function() {
		it('should use the WcHttpEndpointPrototype to request a masterDataItem of masterDataItems', function() {
			var masterDataItemTestData = [{code: 'MasterDataItem1'}, {code: 'MasterDataItem2'}];

			$httpBackend.whenGET('http://localhost:8081/masterdataitem/getMasterDataItem').respond(200, masterDataItemTestData);

			spyOn(MasterDataItemService.masterDataItemEndpoint, 'get').and.callThrough();

			var actualResult = null;
			MasterDataItemService.getMasterDataItems().then(function(masterDataItems) {
				actualResult = masterDataItems;
			});

			$httpBackend.flush();

			expect(MasterDataItemService.masterDataItemEndpoint.get).toHaveBeenCalledWith({cache: 'localStorage', alwaysRefresh: true});
			expect(actualResult).toEqual(masterDataItemTestData);
		});

		it('should return an error if the request for masterDataItem data fails', function() {
			$httpBackend.when('GET', 'unprotected/ping').respond(200, {});

			spyOn(MasterDataItemService.masterDataItemEndpoint, 'get').and.callFake(function() {
				return $q.reject('Error Message');
			});

			var actualResult = null;
			MasterDataItemService.getMasterDataItems().then(function() {
				console.log('This should not happen!');
			}, function(error) {
				actualResult = error;
			});

			$rootScope.$apply();

			expect(actualResult).toEqual('Error Message');
		});
	});

	describe('getMasterDataItem(): ', function() {
		it('should add a subroute onto the masterDataItemEndpoint using the passed in id', function(){
			spyOn(MasterDataItemService.masterDataItemEndpoint, 'subRoute').and.callThrough();

			MasterDataItemService.getMasterDataItem('123');
			//$httpBackend.flush();
			expect(MasterDataItemService.masterDataItemEndpoint.subRoute).toHaveBeenCalledWith('123');
		});

	});

	describe('deleteMasterDataItems(): ', function() {
		it('should loop through the passed in masterDataItem of masterDataItems, calling the delete endpoint for each', function(){
			spyOn(MasterDataItemService.masterDataItemEndpoint, 'delete').and.callFake(function() {
				return $q.when('test');
			});

			var deleteMasterDataItemsToDelete =[{id: '1', code:'List Item1'}, {id: '2', code:'List Item2'}];

			MasterDataItemService.deleteMasterDataItems(deleteMasterDataItemsToDelete);

			$rootScope.$apply();

			expect(MasterDataItemService.masterDataItemEndpoint.delete).toHaveBeenCalledWith('1', {offline: 'queue'});
			expect(MasterDataItemService.masterDataItemEndpoint.delete).toHaveBeenCalledWith('2', {offline: 'queue'});
		});

		it('in the success case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(MasterDataItemService.masterDataItemEndpoint, 'delete').and.callFake(function() {
				return $q.when('test');
			});

			var deleteMasterDataItemsToDelete =[{id: '1', code:'List Item1'}, {id: '2', code:'List Item2'}];

			MasterDataItemService.deleteMasterDataItems(deleteMasterDataItemsToDelete).then(function(results){
				expect(results).toEqual([{name:'List Item1', success: true}, {name:'List Item2', success: true}]);
			});

			$rootScope.$apply();
		});

		it('in the error case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(MasterDataItemService.masterDataItemEndpoint, 'delete').and.callFake(function() {
				return $q.reject('test');
			});

			var deleteMasterDataItemsToDelete =[{id: '1', code:'List Item1'}, {id: '2', code:'List Item2'}];

			MasterDataItemService.deleteMasterDataItems(deleteMasterDataItemsToDelete).then(function(results){
				expect(results).toEqual([{name:'List Item1', success: false}, {name:'List Item2', success: false}]);
			});

			$rootScope.$apply();
		});

		it('in offline queue case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(MasterDataItemService.masterDataItemEndpoint, 'delete').and.callFake(function() {
				return $q.when({status: 'queue'});
			});

			var deleteMasterDataItemsToDelete =[{id: '1', code:'List Item1'}, {id: '2', code:'List Item2'}];

			MasterDataItemService.deleteMasterDataItems(deleteMasterDataItemsToDelete).then(function(results){
				expect(results).toEqual([{name:'List Item1', success: 'queue'}, {name:'List Item2', success: 'queue'}]);
			});

			$rootScope.$apply();
		});
	});

	describe('createMasterDataItem():', function() {

		it('should send a POST to save a masterDataItem, and when successful clear the masterDataItem object', function() {
			spyOn(MasterDataItemService.masterDataItemEndpoint, 'post').and.callFake(function() {
				return $q.when({data : {code: 'test'}});
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});
			spyOn(WcAlertConsoleService, 'addMessage');

			MasterDataItemService.createMasterDataItem(testMasterDataItemObject);

			$rootScope.$apply();

			expect(MasterDataItemService.masterDataItemEndpoint.post).toHaveBeenCalledWith(testMasterDataItemObject, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'success', multiple: false});
		});

		it('should send a POST to save a masterDataItem, and when the request is queued clear the masterDataItem object', function() {
			spyOn(MasterDataItemService.masterDataItemEndpoint, 'post').and.callFake(function() {
				return $q.when({status: 'queue'});
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test queue';
			});

			spyOn(WcAlertConsoleService, 'addMessage');

			MasterDataItemService.createMasterDataItem(testMasterDataItemObject);

			$rootScope.$apply();

			expect(MasterDataItemService.masterDataItemEndpoint.post).toHaveBeenCalledWith(testMasterDataItemObject, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test queue', type: 'success', multiple: false});
		});


		it('should add an error message to the message queue if the post fails, and should not clear the masterDataItem object', function() {
			spyOn(MasterDataItemService.masterDataItemEndpoint, 'post').and.callFake(function() {
				return $q.reject('test');
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});
			spyOn(WcAlertConsoleService, 'addMessage');

			MasterDataItemService.createMasterDataItem(testMasterDataItemObject);

			$rootScope.$apply();

			expect(MasterDataItemService.masterDataItemEndpoint.post).toHaveBeenCalled();
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'danger', multiple: false});
		});

	});

	describe('updateMasterDataItem():', function() {

		it('should attempt to update a masterDataItem and create a success alert if the request succeeds', function() {
			var testMasterDataItem = {code: 'MasterDataItem1', id: '1'};
			var testMasterDataItemId = testMasterDataItem.id;

			spyOn(MasterDataItemService.masterDataItemEndpoint, 'put').and.callFake(function() {
				return $q.when('test');
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});

			//update to use new function signature, passing in the booking
			MasterDataItemService.updateMasterDataItem(testMasterDataItem);

			$rootScope.$apply();

			delete testMasterDataItem.id;

			expect(MasterDataItemService.masterDataItemEndpoint.put).toHaveBeenCalledWith(testMasterDataItemId, testMasterDataItem, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'success', multiple: false});
		});

		it('should attempt to update a masterDataItem and create a queued alert if the request is queued', function() {
			var testMasterDataItem = {code: 'MasterDataItem1', id: '1'};
			var testMasterDataItemId = testMasterDataItem.id;

			spyOn(MasterDataItemService.masterDataItemEndpoint, 'put').and.callFake(function() {
				return $q.when('queue');
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test queue';
			});

			MasterDataItemService.updateMasterDataItem(testMasterDataItem);

			$rootScope.$apply();

			delete testMasterDataItem.id;

			expect(MasterDataItemService.masterDataItemEndpoint.put).toHaveBeenCalledWith(testMasterDataItemId, testMasterDataItem, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test queue', type: 'success', multiple: false});
		});

		it('should put a message on the screen in the error case if the status code is not 409 and should reject the promise with the error object', function(){
			var testMasterDataItem = {code: 'MasterDataItem1', id: '1'};

			spyOn(MasterDataItemService.masterDataItemEndpoint, 'put').and.callFake(function() {
				return $q.reject({status: 'not409'});
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});

			MasterDataItemService.updateMasterDataItem(testMasterDataItem).then(function(){}, function(error){
				expect(error).toEqual({status: 'not409'});
			});

			$rootScope.$apply();
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalled();
		});
	});
});
