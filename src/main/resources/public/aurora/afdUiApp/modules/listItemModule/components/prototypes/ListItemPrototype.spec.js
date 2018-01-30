'use strict';

describe('AfdUiAppListItemModule ListItemPrototype:', function() {
	//Dependencies
	var ListItemPrototype;

	//Test Data
	var originalObject, fullObject;

	beforeEach(function() {
		module('AfdUiAppListItemModule');

		inject(function($injector) {
			ListItemPrototype = $injector.get('ListItemPrototype');
		});

		originalObject = new ListItemPrototype({
			code: 'ListItem1'
		});

		fullObject = new ListItemPrototype({"id":"7","code":"ListItem1","description":"Test ListItem","active":false});
	});

	describe('Constructor:', function() {
		it('should be defined', function() {
			//noinspection NodeModulesDependencies
            expect(angular.isFunction(ListItemPrototype)).toBe(true);
		});

		it('should add missing properties that are in the passed in object', function() {
			var testObject = new ListItemPrototype({
				newProp: 'This is different.'
			});

			expect(testObject.newProp).toEqual('This is different.');
		});

		it('should overwrite properties in the original object with the properties from the passed in object', function() {
			var name = 'UpdatedList1';

			var testObject = new ListItemPrototype({
				code: name
			});

			expect(testObject.code).toEqual(name);
		});

		it('should overwrite and add missing properties in the original object with the properties from the passed in object', function() {
			var testObject = new ListItemPrototype({
				code: 'ListItem1',
				description: 'Test ListItem'
			});

			expect(testObject.code).toEqual('ListItem1');
			expect(testObject.description).toEqual('Test ListItem');
		});

		it('should have default values when passed nothing', function() {
			var testObject = new ListItemPrototype();

			expect(testObject.id).toEqual('');
			expect(testObject.code).toEqual('');
			expect(testObject.description).toBeNull();
			expect(testObject.active).toEqual(false);
		});

		it('should have default values when passed null', function() {
			var testObject = new ListItemPrototype(null);

			expect(testObject.id).toEqual('');
			expect(testObject.code).toEqual('');
			expect(testObject.description).toBeNull();
			expect(testObject.active).toEqual(false);
		});

		it('should have default values when passed {}', function() {
			var testObject = new ListItemPrototype({});

			expect(testObject.id).toEqual('');
			expect(testObject.code).toEqual('');
			expect(testObject.description).toBeNull();
			expect(testObject.active).toEqual(false);
		});

		it('should have default values when passed undefined', function() {
			var testObject = new ListItemPrototype(undefined);

			expect(testObject.id).toEqual('');
			expect(testObject.code).toEqual('');
			expect(testObject.description).toBeNull();
			expect(testObject.active).toEqual(false);
		});
	});

	describe('Function [createFrom]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(ListItemPrototype.prototype.createFrom)).toBe(true);
		});

		it('should add missing properties to the original object that are in the passed in object', function() {
			var testObject = {
				code: 'ListItem1'
			};

			originalObject.createFrom(testObject);

			expect(originalObject.code).toEqual('ListItem1');
		});

		it('should have a createFrom function that does not populate the original object when passed null', function() {
			var testObject = null;

			originalObject.createFrom(testObject);

			expect(originalObject.code).toEqual('ListItem1');
		});

		it('should have a createFrom function that does not populate the original object when passed {}', function() {
			var testObject = {};

			originalObject.createFrom(testObject);

			expect(originalObject.code).toEqual('ListItem1');
		});

		it('should have a createFrom function that does not populate the original object when passed nothing', function() {
			originalObject.createFrom();

			expect(originalObject.code).toEqual('ListItem1');
		});

		it('should have a createFrom function that does not populate the original object when passed undefined', function() {
			originalObject.createFrom(undefined);

			expect(originalObject.code).toEqual('ListItem1');
		});
	});

	describe('Function [compareTo]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(ListItemPrototype.prototype.compareTo)).toBe(true);
		});

		it('should return true when the names are equal', function() {
			var compareObject1 = new ListItemPrototype({
				code: 'ListItem1'
			});
			var compareObject2 = new ListItemPrototype({
				code: 'ListItem1'
			});

			expect(compareObject1.compareTo(compareObject2)).toBeTruthy();
		});

		it('should return false when the names are not equal', function() {
			var compareObject1 = new ListItemPrototype({
				id: '1',
				code: 'ListItem1'
			});
			var compareObject2 = new ListItemPrototype({
				id: '2',
				code: 'ListItem2'
			});

			expect(compareObject1.compareTo(compareObject2)).toBeFalsy();
		});

		it('should return false when the names are not equal', function() {
			var compareObject1 = new ListItemPrototype({
				id: '1',
				code: 'ListItem1',
				active: false
			});
			var compareObject2 = new ListItemPrototype({
				id: '2',
				code: 'ListItem2',
				active: true
			});

			expect(compareObject1.compareTo(compareObject2)).toBeFalsy();
		});
	});
});
