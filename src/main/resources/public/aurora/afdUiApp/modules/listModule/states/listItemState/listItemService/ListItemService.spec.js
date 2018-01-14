'use strict';

describe('AfdUiAppListComponentsModule ListService:', function() {

	var ListService, WcHttpEndpointPrototype, $rootScope, $q, WcAlertConsoleService, BookingPrototype, $translate,
		$httpBackend, WcHttpRequestService, ConflictNotificationModalService, $state;

	var testBookingObject = {
		confirmationNumber: '123',
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
			ConflictNotificationModalService = $injector.get('ConflictNotificationModalService');
			$state = $injector.get('$state');
		});

		WcHttpRequestService.configureDefaults({baseUrl: 'http://www.ford.com/'});
	});

	it('defines a ListService', function() {
		expect(ListService).toBeDefined();
	});

	describe('getLists(): ', function() {
		it('should use the WcHttpEndpointPrototype to request a list of bookings', function() {
			var bookingTestData = [{confNum: '1'}, {confNum: '1'}];

			$httpBackend.whenGET('http://www.ford.com/bookings').respond(200, bookingTestData);

			spyOn(ListService.listEndpoint, 'get').and.callThrough();

			var actualResult = null;
			ListService.getLists().then(function(bookings) {
				actualResult = bookings;
			});

			$httpBackend.flush();

			expect(ListService.listEndpoint.get).toHaveBeenCalledWith({cache: 'localStorage', alwaysRefresh: true});
			expect(actualResult).toEqual(bookingTestData);
		});

		it('should return an error if the request for booking data fails', function() {
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
		it('should add a subroute onto the listEndpoint using the passed in confirmationNumber', function(){
			//$httpBackend.whenGET('http://www.ford.com/bookings/123').respond(200);
			spyOn(ListService.listEndpoint, 'subRoute').and.callThrough();

			ListService.getList('123');
			//$httpBackend.flush();
			expect(ListService.listEndpoint.subRoute).toHaveBeenCalledWith('123');
		});

		it('should call get() off of the subroute endpoint', function(){
			//some complicated mocking here to allow us to spy on the get call hanging off of the subRoute endpoint
			//first mock the get function with an appropriate function returning a promise
			var subRouteGetMock = function(){
				return $q.when('booking');
			};
			//then mock the subRoute return object, using the subRouteGetMock appropriately
			var subRouteMock = {'get': subRouteGetMock};
			//finally, set up the needed spies
			spyOn(ListService.listEndpoint, 'subRoute').and.returnValue(subRouteMock);
			spyOn(subRouteMock, 'get').and.callThrough();

			ListService.getList('123');

			$rootScope.$digest();
			expect(subRouteMock.get).toHaveBeenCalledWith({cache: 'localStorage', alwaysRefresh: true});
		});

		it('should return a booking prototype of the data property from the response object inside of the promise success case', function(){
			var subRouteGetMock = function(){
				return $q.when({data: testBookingObject});
			};
			var subRouteMock = {'get': subRouteGetMock};
			spyOn(ListService.listEndpoint, 'subRoute').and.returnValue(subRouteMock);
			spyOn(subRouteMock, 'get').and.callThrough();

			ListService.getList('123').then(function(obj){
				expect(obj.compareTo(testBookingObject)).toBeTruthy();
			});

			$rootScope.$digest();
		});
	});

	describe('deleteBookings(): ', function() {
		it('should loop through the passed in list of bookings, calling the delete endpoint for each', function(){
			spyOn(ListService.listEndpoint, 'delete').and.callFake(function() {
				return $q.when('test');
			});

			var testListsToDelete = [{confirmationNumber: '1'}, {confirmationNumber: '2'}];

			ListService.deleteBookings(testListsToDelete);

			$rootScope.$apply();

			expect(ListService.listEndpoint.delete).toHaveBeenCalledWith('1', {offline: 'queue'});
			expect(ListService.listEndpoint.delete).toHaveBeenCalledWith('2', {offline: 'queue'});
		});

		it('in the success case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(ListService.listEndpoint, 'delete').and.callFake(function() {
				return $q.when('test');
			});

			var testListsToDelete = [{confirmationNumber: '1'}, {confirmationNumber: '2'}];

			ListService.deleteBookings(testListsToDelete).then(function(results){
				expect(results).toEqual([{confirmationNumber: '1', success: true}, {confirmationNumber: '2', success: true}]);
			});

			$rootScope.$apply();
		});

		it('in the error case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(ListService.listEndpoint, 'delete').and.callFake(function() {
				return $q.reject('test');
			});

			var testListsToDelete = [{confirmationNumber: '1'}, {confirmationNumber: '2'}];

			ListService.deleteBookings(testListsToDelete).then(function(results){
				expect(results).toEqual([{confirmationNumber: '1', success: false}, {confirmationNumber: '2', success: false}]);
			});

			$rootScope.$apply();
		});

		it('in offline queue case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(ListService.listEndpoint, 'delete').and.callFake(function() {
				return $q.when({status: 'queue'});
			});

			var testListsToDelete = [{confirmationNumber: '1'}, {confirmationNumber: '2'}];

			ListService.deleteBookings(testListsToDelete).then(function(results){
				expect(results).toEqual([{confirmationNumber: '1', success: 'queue'}, {confirmationNumber: '2', success: 'queue'}]);
			});

			$rootScope.$apply();
		});
	});

	describe('searchBookings()', function() {
		it('should send a GET request via WcHttpEndpointPrototype to return a list of filtered bookings', function() {

			$httpBackend.whenGET('http://www.ford.com/bookings?adventureTypes=testType&customerEmails=testEmail,+testEmail2').respond(200, [{uuid:'success!'}]);

			var adventureTypes = 'testType';
			var customerEmails = 'testEmail, testEmail2';
			var formatedCalls = { params : { adventureTypes : 'testType', customerEmails : 'testEmail, testEmail2' }};

			spyOn(ListService.listEndpoint, 'get').and.callThrough();

			ListService.searchBookings(adventureTypes, customerEmails);

			$httpBackend.flush();

			expect(ListService.listEndpoint.get).toHaveBeenCalledWith(formatedCalls);
		});

		it('should return an error message when the call fails', function() {
			var errorMessage = null;

			spyOn(ListService.listEndpoint, 'get').and.callFake(function() {
				return $q.reject('error message');
			});

			ListService.searchBookings().then(function() {
			}, function(error) {
				errorMessage = error;
			});

			$rootScope.$apply();
			expect(errorMessage).toEqual('error message');

		});


	});

	describe('createBooking():', function() {

		it('should send a POST to save a booking, and when successful clear the booking object', function() {
			spyOn(ListService.listEndpoint, 'post').and.callFake(function() {
				return $q.when('test');
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});
			spyOn(WcAlertConsoleService, 'addMessage');

			ListService.createBooking(testBookingObject);

			$rootScope.$apply();

			expect(ListService.listEndpoint.post).toHaveBeenCalledWith(testBookingObject, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'success', multiple: false});
		});

		it('should send a POST to save a booking, and when the request is queued clear the booking object', function() {
			spyOn(ListService.listEndpoint, 'post').and.callFake(function() {
				return $q.when({status: 'queue'});
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test queue';
			});

			spyOn(WcAlertConsoleService, 'addMessage');

			ListService.createBooking(testBookingObject);

			$rootScope.$apply();

			expect(ListService.listEndpoint.post).toHaveBeenCalledWith(testBookingObject, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test queue', type: 'success', multiple: false});
		});


		it('should add an error message to the message queue if the post fails, and should not clear the booking object', function() {
			spyOn(ListService.listEndpoint, 'post').and.callFake(function() {
				return $q.reject('test');
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});
			spyOn(WcAlertConsoleService, 'addMessage');

			ListService.createBooking(testBookingObject);

			$rootScope.$apply();

			expect(ListService.listEndpoint.post).toHaveBeenCalled();
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'danger', multiple: false});
		});

	});

	describe('updateBooking():', function() {

		it('should attempt to update a booking and create a success alert if the request succeeds', function() {
			var testBooking = new BookingPrototype({confirmationNumber: '1', uuid: '1'});
			var testBookingUuid = testBooking.uuid;

			spyOn(ListService.listEndpoint, 'put').and.callFake(function() {
				return $q.when('test');
			});
			spyOn(testBooking, 'prepareForAction').and.callThrough();
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});

			//update to use new function signature, passing in the booking
			ListService.updateBooking(testBooking);

			$rootScope.$apply();

			delete testBooking.uuid;

			expect(testBooking.prepareForAction).toHaveBeenCalledWith('update');
			expect(ListService.listEndpoint.put).toHaveBeenCalledWith(testBookingUuid, testBooking, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'success', multiple: false});
		});

		it('should attempt to update a booking and create a queued alert if the request is queued', function() {
			var testBooking = new BookingPrototype({confirmationNumber: '1', uuid: '1'});
			var testBookingUuid = testBooking.uuid;

			spyOn(ListService.listEndpoint, 'put').and.callFake(function() {
				return $q.when('queue');
			});
			spyOn(testBooking, 'prepareForAction').and.callThrough();
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test queue';
			});

			ListService.updateBooking(testBooking);

			$rootScope.$apply();

			delete testBooking.uuid;

			expect(testBooking.prepareForAction).toHaveBeenCalledWith('update');
			expect(ListService.listEndpoint.put).toHaveBeenCalledWith(testBookingUuid, testBooking, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test queue', type: 'success', multiple: false});
		});

		it('should put a message on the screen in the error case if the status code is not 409 and should reject the promise with the error object', function(){
			var testBooking = new BookingPrototype({confirmationNumber: '1', uuid: '1'});
			//var testBookingUuid = testBooking.uuid;

			spyOn(ListService.listEndpoint, 'put').and.callFake(function() {
				return $q.reject({status: 'not409'});
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});

			ListService.updateBooking(testBooking).then(function(){}, function(error){
				expect(error).toEqual({status: 'not409'});
			});

			$rootScope.$apply();
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalled();
		});

		it('should pop up the conflict notification modal in the error case if the status code is 409 and should return the promise from the modal', function(){
			var testBooking = new BookingPrototype({confirmationNumber: '1', uuid: '1'});
			//var testBookingUuid = testBooking.uuid;

			spyOn(ListService.listEndpoint, 'put').and.callFake(function() {
				return $q.reject({status: 409});
			});
			spyOn(ConflictNotificationModalService, 'openModal').and.callFake(function(){
				return $q.when('modalPromise');
			});
			spyOn(ListService, 'getList').and.callFake(function() {
				return $q.when('asdf');
			});

			ListService.updateBooking(testBooking).then(function(obj){
				expect(obj).toEqual('modalPromise');
			});

			$rootScope.$apply();

			expect(ConflictNotificationModalService.openModal).toHaveBeenCalled();
		});


		it('should reload the booking and return the updated booking if the user resolved the modal promise', function(){
			var testBooking = new BookingPrototype({confirmationNumber: '1', uuid: '1'});
			//var testBookingUuid = testBooking.uuid;

			spyOn(ListService.listEndpoint, 'put').and.callFake(function() {
				return $q.reject({status: 409});
			});
			spyOn(ConflictNotificationModalService, 'openModal').and.callFake(function(){
				return $q.when('modalPromise');
			});
			spyOn(ListService, 'getList').and.callFake(function() {
				return $q.when('new booking');
			});

			ListService.updateBooking(testBooking).then(function(){}, function(err){

				expect(err).toEqual({error: {status: 409}, updatedBooking: 'new booking'});
			});

			$rootScope.$apply();

			expect(ConflictNotificationModalService.openModal).toHaveBeenCalled();

			//TODO test for the navigation piece once the functional code is implemented
		});

		it('should clear the client-side booking object and redirect to the list booking state if the user rejects the modal promise, and should reject the overall promise', function(){
			var testBooking = new BookingPrototype({confirmationNumber: '1', uuid: '1'});
			//var testBookingUuid = testBooking.uuid;

			spyOn(ListService.listEndpoint, 'put').and.callFake(function() {
				return $q.reject({status: 409});
			});
			spyOn(ConflictNotificationModalService, 'openModal').and.callFake(function(){
				return $q.reject('modalPromise');
			});
			spyOn($state, 'go');

			ListService.updateBooking(testBooking).then(function(){}, function(err){
				expect(err).toEqual({status: 409});
			});

			$rootScope.$apply();

			expect($state.go).toHaveBeenCalledWith('list-booking');
		});

	});
});
