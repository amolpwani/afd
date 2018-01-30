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
			name: 'List1'
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
			var name = 'UpdatedList1';

			var testObject = new ListPrototype({
				name: name
			});

			expect(testObject.name).toEqual(name);
		});

		it('should overwrite and add missing properties in the original object with the properties from the passed in object', function() {
			var testObject = new ListPrototype({
				name: 'List1',
				description: 'Test List'
			});

			expect(testObject.name).toEqual('List1');
			expect(testObject.description).toEqual('Test List');
		});

		it('should have default values when passed nothing', function() {
			var testObject = new ListPrototype();

			expect(testObject.id).toEqual('');
			expect(testObject.name).toEqual('');
			expect(testObject.description).toBeNull();
			expect(testObject.active).toEqual(false);
		});

		it('should have default values when passed null', function() {
			var testObject = new ListPrototype(null);

			expect(testObject.id).toEqual('');
			expect(testObject.name).toEqual('');
			expect(testObject.description).toBeNull();
			expect(testObject.active).toEqual(false);
		});

		it('should have default values when passed {}', function() {
			var testObject = new ListPrototype({});

			expect(testObject.id).toEqual('');
			expect(testObject.name).toEqual('');
			expect(testObject.description).toBeNull();
			expect(testObject.active).toEqual(false);
		});

		it('should have default values when passed undefined', function() {
			var testObject = new ListPrototype(undefined);

			expect(testObject.id).toEqual('');
			expect(testObject.name).toEqual('');
			expect(testObject.description).toBeNull();
			expect(testObject.active).toEqual(false);
		});
	});

	describe('Function [createFrom]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(ListPrototype.prototype.createFrom)).toBe(true);
		});

		it('should add missing properties to the original object that are in the passed in object', function() {
			var testObject = {
				name: 'List1'
			};

			originalObject.createFrom(testObject);

			expect(originalObject.name).toEqual('List1');
		});

		it('should have a createFrom function that does not populate the original object when passed null', function() {
			var testObject = null;

			originalObject.createFrom(testObject);

			expect(originalObject.name).toEqual('List1');
		});

		it('should have a createFrom function that does not populate the original object when passed {}', function() {
			var testObject = {};

			originalObject.createFrom(testObject);

			expect(originalObject.name).toEqual('List1');
		});

		it('should have a createFrom function that does not populate the original object when passed nothing', function() {
			originalObject.createFrom();

			expect(originalObject.name).toEqual('List1');
		});

		it('should have a createFrom function that does not populate the original object when passed undefined', function() {
			originalObject.createFrom(undefined);

			expect(originalObject.name).toEqual('List1');
		});
	});

	describe('Function [compareTo]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(ListPrototype.prototype.compareTo)).toBe(true);
		});

		it('should return true when the names are equal', function() {
			var compareObject1 = new ListPrototype({
				name: 'List1'
			});
			var compareObject2 = new ListPrototype({
				name: 'List1'
			});

			expect(compareObject1.compareTo(compareObject2)).toBeTruthy();
		});

		it('should return false when the names are not equal', function() {
			var compareObject1 = new ListPrototype({
				id: '1',
				name: 'List1'
			});
			var compareObject2 = new ListPrototype({
				id: '2',
				name: 'List2'
			});

			expect(compareObject1.compareTo(compareObject2)).toBeFalsy();
		});

		it('should return false when the names are not equal', function() {
			var compareObject1 = new ListPrototype({
				id: '1',
				name: 'List1',
				active: false
			});
			var compareObject2 = new ListPrototype({
				id: '2',
				name: 'List2',
				active: true
			});

			expect(compareObject1.compareTo(compareObject2)).toBeFalsy();
		});
	});
});
