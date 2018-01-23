'use strict';

describe('AfdUiAppListComponentsModule ListPrototype:', function() {
	//Dependencies
	var ListPrototype;

	//Test Data
	var originalObject, fullObject;

	beforeEach(function() {
		module('AfdUiAppListComponentsModule');

		inject(function($injector) {
			ListPrototype = $injector.get('ListPrototype');
		});

		originalObject = new ListPrototype({
			confirmationNumber: 'ADV-1'
		});

		fullObject = new ListPrototype({"id":"7","name":"List1","description":"Test List","active":false});
	});

	describe('Constructor:', function() {
		it('should be defined', function() {
			//noinspection NodeModulesDependencies
            expect(angular.isFunction(ListPrototype)).toBe(true);
		});

		it('should add missing properties that are in the passed in object', function() {
			var testObject = new ListPrototype({
				newProp: 'This is different.'
			});

			expect(testObject.newProp).toEqual('This is different.');
		});

		it('should overwrite properties in the original object with the properties from the passed in object', function() {
			var testDate = new Date();
			var testYear = testDate.getFullYear();

			var testObject = new ListPrototype({
				startDate: testDate
			});

			expect(testObject.startDate.getFullYear()).toEqual(testYear);
		});

		it('should overwrite and add missing properties in the original object with the properties from the passed in object', function() {
			var testObject = new ListPrototype({
				confirmationNumber: 'Booking1',
				confirmationNumberType: 'QuickBook'
			});

			expect(testObject.confirmationNumber).toEqual('Booking1');
			expect(testObject.confirmationNumberType).toEqual('QuickBook');
		});

		it('should have default values when passed nothing', function() {
			var testObject = new ListPrototype();

			expect(testObject.uuid).toEqual('');
			expect(testObject.startDate).toBeNull();
			expect(testObject.endDate).toBeNull();
			expect(testObject.customer).toEqual(new CustomerPrototype());
			expect(testObject.adventure).toEqual(new AdventurePrototype());
			expect(testObject.departingFlight).toEqual(new FlightPrototype());
			expect(testObject.returningFlight).toEqual(new FlightPrototype());
			expect(testObject.note).toEqual('');
		});

		it('should have default values when passed null', function() {
			var testObject = new ListPrototype(null);

			expect(testObject.uuid).toEqual('');
			expect(testObject.startDate).toBeNull();
			expect(testObject.endDate).toBeNull();
			expect(testObject.customer).toEqual(new CustomerPrototype());
			expect(testObject.adventure).toEqual(new AdventurePrototype());
			expect(testObject.departingFlight).toEqual(new FlightPrototype());
			expect(testObject.returningFlight).toEqual(new FlightPrototype());
			expect(testObject.note).toEqual('');
		});

		it('should have default values when passed {}', function() {
			var testObject = new ListPrototype({});

			expect(testObject.uuid).toEqual('');
			expect(testObject.startDate).toBeNull();
			expect(testObject.endDate).toBeNull();
			expect(testObject.customer).toEqual(new CustomerPrototype());
			expect(testObject.adventure).toEqual(new AdventurePrototype());
			expect(testObject.departingFlight).toEqual(new FlightPrototype());
			expect(testObject.returningFlight).toEqual(new FlightPrototype());
			expect(testObject.note).toEqual('');
		});

		it('should have default values when passed undefined', function() {
			var testObject = new ListPrototype(undefined);

			expect(testObject.uuid).toEqual('');
			expect(testObject.startDate).toBeNull();
			expect(testObject.endDate).toBeNull();
			expect(testObject.customer).toEqual(new CustomerPrototype());
			expect(testObject.adventure).toEqual(new AdventurePrototype());
			expect(testObject.departingFlight).toEqual(new FlightPrototype());
			expect(testObject.returningFlight).toEqual(new FlightPrototype());
			expect(testObject.note).toEqual('');
		});
	});

	describe('Function [createFrom]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(ListPrototype.prototype.createFrom)).toBe(true);
		});

		it('should add missing properties to the original object that are in the passed in object', function() {
			var testObject = {
				confirmationNumberType: 'BookingType 1'
			};

			originalObject.createFrom(testObject);

			expect(originalObject.confirmationNumberType).toEqual('BookingType 1');
		});

		it('should overwrite properties in the original object with the properties from the passed in object', function() {
			var testObject = {
				confirmationNumber: 'Booking 2'
			};

			originalObject.createFrom(testObject);

			expect(originalObject.confirmationNumber).toEqual('Booking 2');
		});

		it('should overwrite and add missing properties in the original object with the properties from the passed in object', function() {
			var testObject = {
				confirmationNumber: 'Booking 2',
				confirmationNumberType: 'BookingType 1'
			};

			originalObject.createFrom(testObject);

			expect(originalObject.confirmationNumber).toEqual('Booking 2');
			expect(originalObject.confirmationNumberType).toEqual('BookingType 1');
		});

		it('should have a createFrom function that does not populate the original object when passed null', function() {
			var testObject = null;

			originalObject.createFrom(testObject);

			expect(originalObject.confirmationNumber).toEqual('ADV-1');
		});

		it('should have a createFrom function that does not populate the original object when passed {}', function() {
			var testObject = {};

			originalObject.createFrom(testObject);

			expect(originalObject.confirmationNumber).toEqual('ADV-1');
		});

		it('should have a createFrom function that does not populate the original object when passed nothing', function() {
			originalObject.createFrom();

			expect(originalObject.confirmationNumber).toEqual('ADV-1');
		});

		it('should have a createFrom function that does not populate the original object when passed undefined', function() {
			originalObject.createFrom(undefined);

			expect(originalObject.confirmationNumber).toEqual('ADV-1');
		});
	});

	describe('Function [compareTo]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(ListPrototype.prototype.compareTo)).toBe(true);
		});

		it('should return true when the confirmationNumbers are equal', function() {
			var compareObject1 = new ListPrototype({
				confirmationNumber: 'Booking 1'
			});
			var compareObject2 = new ListPrototype({
				confirmationNumber: 'Booking 1'
			});

			expect(compareObject1.compareTo(compareObject2)).toBeTruthy();
		});

		it('should return false when the confirmationNumbers are not equal', function() {
			var compareObject1 = new ListPrototype({
				confirmationNumber: 'Booking 1'
			});
			var compareObject2 = new ListPrototype({
				confirmationNumber: 'Booking 2'
			});

			expect(compareObject1.compareTo(compareObject2)).toBeFalsy();
		});

		it('should return false when the confirmationNumbers are not equal', function() {
			var compareObject1 = new ListPrototype({
				confirmationNumber: 'Booking 1',
				confirmationNumberType: 'BookingType 1'
			});
			var compareObject2 = new ListPrototype({
				confirmationNumber: 'Booking 2',
				confirmationNumberType: 'BookingType 1'
			});

			expect(compareObject1.compareTo(compareObject2)).toBeFalsy();
		});

		it('should return false when the confirmationNumberTypes and confirmationNumbers are not equal', function() {
			var compareObject1 = new ListPrototype({
				confirmationNumber: 'Booking 1',
				confirmationNumberType: 'BookingType 1'
			});
			var compareObject2 = new ListPrototype({
				confirmationNumber: 'Booking 2',
				confirmationNumberType: 'BookingType 2'
			});

			expect(compareObject1.compareTo(compareObject2)).toBeFalsy();
		});
	});

	describe('Function [calculateTotalPrice]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(ListPrototype.prototype.calculateTotalPrice)).toBe(true);
		});

		it('should create a new property called totalPrice with a calulated value', function() {
			var testObject = new ListPrototype();
			testObject.adventure.dailyPrice = 400;
			testObject.duration = 5;
			testObject.departingFlight.price = 5;
			testObject.returningFlight.price = 5;

			expect(testObject.totalPrice).toBeUndefined();

			testObject.calculateTotalPrice();

			expect(testObject.totalPrice).toEqual(400 * 5 + 10);
		});

		it('should not create a totalPrice property if given invalid non-numeric values', function() {
			var testObject = new ListPrototype();
			testObject.adventure.dailyPrice = 'derp';
			testObject.duration = 5;

			expect(testObject.totalPrice).toBeUndefined();

			testObject.calculateTotalPrice();

			expect(testObject.totalPrice).toBeUndefined();
		});
	});

	describe('Function [calculateTripDuration]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(ListPrototype.prototype.calculateTripDuration)).toBe(true);
		});

		it('should attempt to create valid dates if invalid date objects are stored in object', function() {
			var testObject = new ListPrototype();
			testObject.startDate = '01/01/2010';
			testObject.endDate = '01/03/2010';

			testObject.calculateTripDuration();

			expect(testObject.duration).toEqual(2);
		});

		it('should calulate difference in days between start and end date and store in duration property', function() {
			var testObject = new ListPrototype();
			testObject.startDate = new Date('01/01/2010');
			testObject.endDate = new Date('01/03/2010');

			testObject.calculateTripDuration();

			expect(testObject.duration).toEqual(2);
		});

		it('should set duration to 1 for a day trip [0 days between]', function() {
			var testObject = new ListPrototype();
			testObject.startDate = new Date('01/01/2010');
			testObject.endDate = new Date('01/01/2010');

			testObject.calculateTripDuration();

			expect(testObject.duration).toEqual(1);
		});

		it('should set negative duration for start day after end day', function() {
			var testObject = new ListPrototype();
			testObject.startDate = new Date('01/03/2010');
			testObject.endDate = new Date('01/01/2010');

			testObject.calculateTripDuration();

			expect(testObject.duration).toEqual(-2);
		});

		it('should not set duration if given invalid date or dates', function() {
			var testObject = new ListPrototype();
			testObject.startDate = {};
			testObject.endDate = 'notADate';

			testObject.calculateTripDuration();

			expect(testObject.duration).toBeUndefined();
		});

	});

	describe('Function [removeCalculatedFields]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(ListPrototype.prototype.removeCalculatedFields)).toBe(true);
		});

		it('should delete totalPrice and duration', function() {
			var testObject = new ListPrototype();
			testObject.removeCalculatedFields();
			expect(testObject.totalPrice).toBeUndefined();
			expect(testObject.duration).toBeUndefined();
		});
	});

	describe('Function [convertDates]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(ListPrototype.prototype.convertDates)).toBe(true);
		});

		it('should format startDate and endDate to be yyyy-MM-dd', function() {
			var testObject = new ListPrototype();
			var currentDate = new Date();
			testObject.startDate = currentDate;
			testObject.endDate = currentDate;

			testObject.convertDates();

			expect(testObject.startDate).toMatch(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/);
			expect(testObject.endDate).toMatch(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/);
		});

		it('should not modify the format of the value not given a valid date', function() {
			var testObject = new ListPrototype();
			var currentDate1 = 'blah';
			var currentDate2 = {};
			var currentDate3 = null;
			var currentDate4 = null;

			testObject.startDate = currentDate1;
			testObject.endDate = currentDate2;

			testObject.convertDates();

			expect(testObject.startDate).toEqual('blah');
			expect(testObject.endDate).toEqual({});

			testObject.startDate = currentDate3;
			testObject.endDate = currentDate4;

			testObject.convertDates();

			expect(testObject.startDate).toEqual(null);
			expect(testObject.endDate).toEqual(null);
		});
	});

	describe('Function [prepareForAction]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(ListPrototype.prototype.prepareForAction)).toBe(true);
		});

		it('should delete confirmationNumber when creating', function(){
			fullObject.prepareForAction('create');
			expect(fullObject.confirmationNumber).toBeUndefined();
		});

		it('should delete customer phone when updating', function(){
			fullObject.prepareForAction('update');
			expect(fullObject.customer.phone).toBeUndefined();
		});

		it('should delete the necessary parameters when called', function(){

		});

		it('should call [removeCalculatedFields] and [convertDates]', function() {
			var testObject = new ListPrototype({
				confirmationNumber: 'ADV-1'
			});

			spyOn(testObject, 'removeCalculatedFields');
			spyOn(testObject, 'convertDates');

			testObject.prepareForAction('create');

			expect(testObject.removeCalculatedFields).toHaveBeenCalled();
			expect(testObject.convertDates).toHaveBeenCalled();
		});
	});
});
