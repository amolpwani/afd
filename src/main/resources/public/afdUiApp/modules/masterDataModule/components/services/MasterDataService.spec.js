'use strict';

describe('AfdUiAppMasterDataComponentsModule MasterDataService:', function() {

	var MasterDataService, WcHttpEndpointPrototype, $rootScope, $q, WcAlertConsoleService, $translate,
		$httpBackend, WcHttpRequestService, $state;

	var testMasterDataObject = {
		id: '1',
		name: 'MasterData1',
		prepareForAction: function() {
			return true;
		}
	};

	beforeEach(function() {
		module('AfdUiAppMasterDataComponentsModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$q = $injector.get('$q');
			$translate = $injector.get('$translate');
			WcHttpEndpointPrototype = $injector.get('WcHttpEndpointPrototype');
			MasterDataService = $injector.get('MasterDataService');
			WcAlertConsoleService = $injector.get('WcAlertConsoleService');
			$httpBackend = $injector.get('$httpBackend');
			WcHttpRequestService = $injector.get('WcHttpRequestService');
			$state = $injector.get('$state');
		});

		WcHttpRequestService.configureDefaults({baseUrl: 'http://localhost:8081/'});
	});

	it('defines a MasterDataService', function() {
		expect(MasterDataService).toBeDefined();
	});

	describe('getMasterDatas(): ', function() {
		it('should use the WcHttpEndpointPrototype to request a list of masterdata', function() {
			var listTestData = [{name: 'Liist1'}, {name: 'MasterData2'}];

			$httpBackend.whenGET('http://localhost:8081/masterdata/getMasterData').respond(200, listTestData);

			spyOn(MasterDataService.masterDataEndpoint, 'get').and.callThrough();

			var actualResult = null;
			MasterDataService.getMasterDatas().then(function(masterdata) {
				actualResult = masterdata;
			});

			$httpBackend.flush();

			expect(MasterDataService.masterDataEndpoint.get).toHaveBeenCalledWith({cache: 'localStorage', alwaysRefresh: true});
			expect(actualResult).toEqual(listTestData);
		});

		it('should return an error if the request for masterdata fails', function() {
			$httpBackend.when('GET', 'unprotected/ping').respond(200, {});

			spyOn(MasterDataService.masterDataEndpoint, 'get').and.callFake(function() {
				return $q.reject('Error Message');
			});

			var actualResult = null;
			MasterDataService.getMasterDatas().then(function() {
				console.log('This should not happen!');
			}, function(error) {
				actualResult = error;
			});

			$rootScope.$apply();

			expect(actualResult).toEqual('Error Message');
		});
	});

	describe('getMasterData(): ', function() {
		it('should add a subroute onto the masterDataEndpoint using the passed in id', function(){
			spyOn(MasterDataService.masterDataEndpoint, 'subRoute').and.callThrough();

			MasterDataService.getMasterData('123');
			//$httpBackend.flush();
			expect(MasterDataService.masterDataEndpoint.subRoute).toHaveBeenCalledWith('123');
		});

	});

	describe('deleteMasterDatas(): ', function() {
		it('should loop through the passed in list of masterdata, calling the delete endpoint for each', function(){
			spyOn(MasterDataService.masterDataEndpoint, 'delete').and.callFake(function() {
				return $q.when('test');
			});

			var testMasterDatasToDelete = [{id: '1', name:'MasterData1'}, {id: '2', name:'MasterData2'}];

			MasterDataService.deleteMasterDatas(testMasterDatasToDelete);

			$rootScope.$apply();

			expect(MasterDataService.masterDataEndpoint.delete).toHaveBeenCalledWith('1', {offline: 'queue'});
			expect(MasterDataService.masterDataEndpoint.delete).toHaveBeenCalledWith('2', {offline: 'queue'});
		});

		it('in the success case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(MasterDataService.masterDataEndpoint, 'delete').and.callFake(function() {
				return $q.when('test');
			});

			var testMasterDatasToDelete = [{id: '1', name:'MasterData1'}, {id: '2', name:'MasterData2'}];

			MasterDataService.deleteMasterDatas(testMasterDatasToDelete).then(function(results){
				expect(results).toEqual([{name:'MasterData1', success: true}, {name:'MasterData2', success: true}]);
			});

			$rootScope.$apply();
		});

		it('in the error case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(MasterDataService.masterDataEndpoint, 'delete').and.callFake(function() {
				return $q.reject('test');
			});

			var testMasterDatasToDelete = [{id: '1', name:'MasterData1'}, {id: '2', name:'MasterData2'}];

			MasterDataService.deleteMasterDatas(testMasterDatasToDelete).then(function(results){
				expect(results).toEqual([{name:'MasterData1', success: false}, {name:'MasterData2', success: false}]);
			});

			$rootScope.$apply();
		});

		it('in offline queue case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(MasterDataService.masterDataEndpoint, 'delete').and.callFake(function() {
				return $q.when({status: 'queue'});
			});

			var testMasterDatasToDelete = [{id: '1', name:'MasterData1'}, {id: '2', name:'MasterData2'}];

			MasterDataService.deleteMasterDatas(testMasterDatasToDelete).then(function(results){
				expect(results).toEqual([{name:'MasterData1', success: 'queue'}, {name:'MasterData2', success: 'queue'}]);
			});

			$rootScope.$apply();
		});
	});

	describe('createMasterData():', function() {

		it('should send a POST to save a list, and when successful clear the list object', function() {
			spyOn(MasterDataService.masterDataEndpoint, 'post').and.callFake(function() {
				return $q.when({data : {name: 'test'}});
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});
			spyOn(WcAlertConsoleService, 'addMessage');

			MasterDataService.createMasterData(testMasterDataObject);

			$rootScope.$apply();

			expect(MasterDataService.masterDataEndpoint.post).toHaveBeenCalledWith(testMasterDataObject, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'success', multiple: false});
		});

		it('should send a POST to save a list, and when the request is queued clear the list object', function() {
			spyOn(MasterDataService.masterDataEndpoint, 'post').and.callFake(function() {
				return $q.when({status: 'queue'});
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test queue';
			});

			spyOn(WcAlertConsoleService, 'addMessage');

			MasterDataService.createMasterData(testMasterDataObject);

			$rootScope.$apply();

			expect(MasterDataService.masterDataEndpoint.post).toHaveBeenCalledWith(testMasterDataObject, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test queue', type: 'success', multiple: false});
		});


		it('should add an error message to the message queue if the post fails, and should not clear the masterdata object', function() {
			spyOn(MasterDataService.masterDataEndpoint, 'post').and.callFake(function() {
				return $q.reject('test');
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});
			spyOn(WcAlertConsoleService, 'addMessage');

			MasterDataService.createMasterData(testMasterDataObject);

			$rootScope.$apply();

			expect(MasterDataService.masterDataEndpoint.post).toHaveBeenCalled();
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'danger', multiple: false});
		});

	});

	describe('updateMasterData():', function() {

		it('should attempt to update a masterdata and create a success alert if the request succeeds', function() {
			var testMasterData = {name: 'MasterData1', id: '1'};
			var testMasterDataId = testMasterData.id;

			spyOn(MasterDataService.masterDataEndpoint, 'put').and.callFake(function() {
				return $q.when({data : {name: 'test'}});
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});

			//update to use new function signature, passing in the booking
			MasterDataService.updateMasterData(testMasterData);

			$rootScope.$apply();

			delete testMasterData.id;

			expect(MasterDataService.masterDataEndpoint.put).toHaveBeenCalledWith(testMasterDataId, testMasterData, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'success', multiple: false});
		});

		it('should attempt to update a masterData and create a queued alert if the request is queued', function() {
			var testMasterData = {name: 'MasterData1', id: '1'};
			var testMasterDataId = testMasterData.id;

			spyOn(MasterDataService.masterDataEndpoint, 'put').and.callFake(function() {
				return $q.when('queue');
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test queue';
			});

			MasterDataService.updateMasterData(testMasterData);

			$rootScope.$apply();

			delete testMasterData.id;

			expect(MasterDataService.masterDataEndpoint.put).toHaveBeenCalledWith(testMasterDataId, testMasterData, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test queue', type: 'success', multiple: false});
		});

		it('should put a message on the screen in the error case if the status code is not 409 and should reject the promise with the error object', function(){
			var testMasterData = {name: 'MasterData1', id: '1'};

			spyOn(MasterDataService.masterDataEndpoint, 'put').and.callFake(function() {
				return $q.reject({status: 'not409'});
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});

			MasterDataService.updateMasterData(testMasterData).then(function(){}, function(error){
				expect(error).toEqual({status: 'not409'});
			});

			$rootScope.$apply();
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalled();
		});
	});
});
