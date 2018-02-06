'use strict';

describe('AfdUiAppMasterDataItemModule MasterDataItemPrototype:', function() {
	//Dependencies
	var MasterDataItemPrototype;

	//Test Data
	var originalObject, fullObject;

	beforeEach(function() {
		module('AfdUiAppMasterDataItemModule');

		inject(function($injector) {
			MasterDataItemPrototype = $injector.get('MasterDataItemPrototype');
		});

		originalObject = new MasterDataItemPrototype({
			code: 'MasterDataItem1'
		});

		fullObject = new MasterDataItemPrototype({"id":"7","code":"MasterDataItem1","description":"Test MasterDataItem","active":false});
	});

	describe('Constructor:', function() {
		it('should be defined', function() {
			//noinspection NodeModulesDependencies
            expect(angular.isFunction(MasterDataItemPrototype)).toBe(true);
		});

		it('should add missing properties that are in the passed in object', function() {
			var testObject = new MasterDataItemPrototype({
				newProp: 'This is different.'
			});

			expect(testObject.newProp).toEqual('This is different.');
		});

		it('should overwrite properties in the original object with the properties from the passed in object', function() {
			var name = 'UpdatedList1';

			var testObject = new MasterDataItemPrototype({
				code: name
			});

			expect(testObject.code).toEqual(name);
		});

		it('should overwrite and add missing properties in the original object with the properties from the passed in object', function() {
			var testObject = new MasterDataItemPrototype({
				code: 'MasterDataItem1',
				description: 'Test MasterDataItem'
			});

			expect(testObject.code).toEqual('MasterDataItem1');
			expect(testObject.description).toEqual('Test MasterDataItem');
		});

		it('should have default values when passed nothing', function() {
			var testObject = new MasterDataItemPrototype();

			expect(testObject.id).toEqual('');
			expect(testObject.code).toEqual('');
			expect(testObject.description).toBeNull();
			expect(testObject.active).toEqual(false);
		});

		it('should have default values when passed null', function() {
			var testObject = new MasterDataItemPrototype(null);

			expect(testObject.id).toEqual('');
			expect(testObject.code).toEqual('');
			expect(testObject.description).toBeNull();
			expect(testObject.active).toEqual(false);
		});

		it('should have default values when passed {}', function() {
			var testObject = new MasterDataItemPrototype({});

			expect(testObject.id).toEqual('');
			expect(testObject.code).toEqual('');
			expect(testObject.description).toBeNull();
			expect(testObject.active).toEqual(false);
		});

		it('should have default values when passed undefined', function() {
			var testObject = new MasterDataItemPrototype(undefined);

			expect(testObject.id).toEqual('');
			expect(testObject.code).toEqual('');
			expect(testObject.description).toBeNull();
			expect(testObject.active).toEqual(false);
		});
	});

	describe('Function [createFrom]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(MasterDataItemPrototype.prototype.createFrom)).toBe(true);
		});

		it('should add missing properties to the original object that are in the passed in object', function() {
			var testObject = {
				code: 'MasterDataItem1'
			};

			originalObject.createFrom(testObject);

			expect(originalObject.code).toEqual('MasterDataItem1');
		});

		it('should have a createFrom function that does not populate the original object when passed null', function() {
			var testObject = null;

			originalObject.createFrom(testObject);

			expect(originalObject.code).toEqual('MasterDataItem1');
		});

		it('should have a createFrom function that does not populate the original object when passed {}', function() {
			var testObject = {};

			originalObject.createFrom(testObject);

			expect(originalObject.code).toEqual('MasterDataItem1');
		});

		it('should have a createFrom function that does not populate the original object when passed nothing', function() {
			originalObject.createFrom();

			expect(originalObject.code).toEqual('MasterDataItem1');
		});

		it('should have a createFrom function that does not populate the original object when passed undefined', function() {
			originalObject.createFrom(undefined);

			expect(originalObject.code).toEqual('MasterDataItem1');
		});
	});

	describe('Function [compareTo]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(MasterDataItemPrototype.prototype.compareTo)).toBe(true);
		});

		it('should return true when the names are equal', function() {
			var compareObject1 = new MasterDataItemPrototype({
				code: 'MasterDataItem1'
			});
			var compareObject2 = new MasterDataItemPrototype({
				code: 'MasterDataItem1'
			});

			expect(compareObject1.compareTo(compareObject2)).toBeTruthy();
		});

		it('should return false when the names are not equal', function() {
			var compareObject1 = new MasterDataItemPrototype({
				id: '1',
				code: 'MasterDataItem1'
			});
			var compareObject2 = new MasterDataItemPrototype({
				id: '2',
				code: 'MasterDataItem2'
			});

			expect(compareObject1.compareTo(compareObject2)).toBeFalsy();
		});

		it('should return false when the names are not equal', function() {
			var compareObject1 = new MasterDataItemPrototype({
				id: '1',
				code: 'MasterDataItem1',
				active: false
			});
			var compareObject2 = new MasterDataItemPrototype({
				id: '2',
				code: 'MasterDataItem2',
				active: true
			});

			expect(compareObject1.compareTo(compareObject2)).toBeFalsy();
		});
	});
});
