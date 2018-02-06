'use strict';

describe('AfdUiAppFoundationDataColumnComponentsModule FoundationDataColumnPrototype:', function() {
	//Dependencies
	var FoundationDataColumnPrototype;

	//Test Data
	var originalObject, fullObject;

	beforeEach(function() {
		module('AfdUiAppFoundationDataColumnComponentsModule');

		inject(function($injector) {
			FoundationDataColumnPrototype = $injector.get('FoundationDataColumnPrototype');
		});

		originalObject = new FoundationDataColumnPrototype({
			uiColumnName: 'Column1'
		});

		fullObject = new FoundationDataColumnPrototype({"id":"7","uiColumnName":"Column1","hoverHelp":"Column1 help","uniqueColumn":false});
	});

	describe('Constructor:', function() {
		it('should be defined', function() {
			//noinspection NodeModulesDependencies
            expect(angular.isFunction(FoundationDataColumnPrototype)).toBe(true);
		});

		it('should add missing properties that are in the passed in object', function() {
			var testObject = new FoundationDataColumnPrototype({
				newProp: 'This is different.'
			});

			expect(testObject.newProp).toEqual('This is different.');
		});

		it('should overwrite properties in the original object with the properties from the passed in object', function() {
			var name = 'Updated Column1';

			var testObject = new FoundationDataColumnPrototype({
				uiColumnName: name
			});

			expect(testObject.uiColumnName).toEqual(name);
		});

		it('should overwrite and add missing properties in the original object with the properties from the passed in object', function() {
			var testObject = new FoundationDataColumnPrototype({
				uiColumnName: 'Column1',
				hoverHelp: 'Column1 Help'
			});

			expect(testObject.uiColumnName).toEqual('Column1');
			expect(testObject.hoverHelp).toEqual('Column1 Help');
		});

		it('should have default values when passed nothing', function() {
			var testObject = new FoundationDataColumnPrototype();

			expect(testObject.id).toEqual('');
			expect(testObject.uiColumnName).toEqual('');
			expect(testObject.hoverHelp).toEqual('');
			expect(testObject.uniqueColumn).toEqual(false);
			expect(testObject.inputType).toEqual('Text');
			expect(testObject.selectedList).toEqual('');
			expect(testObject.listDisplayType).toEqual('Code');
			expect(testObject.mandatory).toEqual(false);
			expect(testObject.sortOrder).toEqual(0);
			expect(testObject.editable).toEqual(false);
			expect(testObject.length).toEqual(0);
			expect(testObject.selectedListId).toEqual(1);
		});

		it('should have default values when passed null', function() {
			var testObject = new FoundationDataColumnPrototype(null);

			expect(testObject.id).toEqual('');
			expect(testObject.uiColumnName).toEqual('');
			expect(testObject.hoverHelp).toEqual('');
			expect(testObject.uniqueColumn).toEqual(false);
			expect(testObject.inputType).toEqual('Text');
			expect(testObject.selectedList).toEqual('');
			expect(testObject.listDisplayType).toEqual('Code');
			expect(testObject.mandatory).toEqual(false);
			expect(testObject.sortOrder).toEqual(0);
			expect(testObject.editable).toEqual(false);
			expect(testObject.length).toEqual(0);
			expect(testObject.selectedListId).toEqual(1);
		});

		it('should have default values when passed {}', function() {
			var testObject = new FoundationDataColumnPrototype({});

			expect(testObject.id).toEqual('');
			expect(testObject.uiColumnName).toEqual('');
			expect(testObject.hoverHelp).toEqual('');
			expect(testObject.uniqueColumn).toEqual(false);
			expect(testObject.inputType).toEqual('Text');
			expect(testObject.selectedList).toEqual('');
			expect(testObject.listDisplayType).toEqual('Code');
			expect(testObject.mandatory).toEqual(false);
			expect(testObject.sortOrder).toEqual(0);
			expect(testObject.editable).toEqual(false);
			expect(testObject.length).toEqual(0);
			expect(testObject.selectedListId).toEqual(1);
		});

		it('should have default values when passed undefined', function() {
			var testObject = new FoundationDataColumnPrototype(undefined);

			expect(testObject.id).toEqual('');
			expect(testObject.uiColumnName).toEqual('');
			expect(testObject.hoverHelp).toEqual('');
			expect(testObject.uniqueColumn).toEqual(false);
			expect(testObject.inputType).toEqual('Text');
			expect(testObject.selectedList).toEqual('');
			expect(testObject.listDisplayType).toEqual('Code');
			expect(testObject.mandatory).toEqual(false);
			expect(testObject.sortOrder).toEqual(0);
			expect(testObject.editable).toEqual(false);
			expect(testObject.length).toEqual(0);
			expect(testObject.selectedListId).toEqual(1);
		});
	});

	describe('Function [createFrom]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(FoundationDataColumnPrototype.prototype.createFrom)).toBe(true);
		});

		it('should add missing properties to the original object that are in the passed in object', function() {
			var testObject = {
				uiColumnName: 'Column1'
			};

			originalObject.createFrom(testObject);

			expect(originalObject.uiColumnName).toEqual('Column1');
		});

		it('should have a createFrom function that does not populate the original object when passed null', function() {
			var testObject = null;

			originalObject.createFrom(testObject);

			expect(originalObject.uiColumnName).toEqual('Column1');
		});

		it('should have a createFrom function that does not populate the original object when passed {}', function() {
			var testObject = {};

			originalObject.createFrom(testObject);

			expect(originalObject.uiColumnName).toEqual('Column1');
		});

		it('should have a createFrom function that does not populate the original object when passed nothing', function() {
			originalObject.createFrom();

			expect(originalObject.uiColumnName).toEqual('Column1');
		});

		it('should have a createFrom function that does not populate the original object when passed undefined', function() {
			originalObject.createFrom(undefined);

			expect(originalObject.uiColumnName).toEqual('Column1');
		});
	});

	describe('Function [compareTo]:', function() {
		it('should be defined', function() {
			expect(angular.isFunction(FoundationDataColumnPrototype.prototype.compareTo)).toBe(true);
		});

		it('should return true when the names are equal', function() {
			var compareObject1 = new FoundationDataColumnPrototype({
				uiColumnName: 'Column1'
			});
			var compareObject2 = new FoundationDataColumnPrototype({
				uiColumnName: 'Column1'
			});

			expect(compareObject1.compareTo(compareObject2)).toBeTruthy();
		});

		it('should return false when the names are not equal', function() {
			var compareObject1 = new FoundationDataColumnPrototype({
				id: '1',
				uiColumnName: 'Column1'
			});
			var compareObject2 = new FoundationDataColumnPrototype({
				id: '2',
				uiColumnName: 'Column2'
			});

			expect(compareObject1.compareTo(compareObject2)).toBeFalsy();
		});
	});
});
