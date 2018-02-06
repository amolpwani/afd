'use strict';

describe('AfdUiAppComponentsModule DeleteModalInstanceController:', function() {
	beforeEach(module('AfdUiAppComponentsModule'));

	describe('', function() {
		var DeleteModalInstanceControllerInstanceUIC = null,
			scope = null, $controller,
			modalInstance, recordsColumnMock, typeOfRecords;

		recordsColumnMock = ['1', '2'];
		typeOfRecords = 'MasterData';

		beforeEach(function() {
			inject(function($rootScope, $injector) {
				scope = $rootScope.$new();
				$controller = $injector.get('$controller');
				//we can't inject $uibModalInstance without calling $uibModal.open. we don't really care to have a full modalInstance
				//anyway, so just inject a mocked out modalInstance for the functions we use
				modalInstance = {
					close: jasmine.createSpy('modalInstance.close'),
					dismiss: jasmine.createSpy('modalInstance.dismiss')
				};
			});

			DeleteModalInstanceControllerInstanceUIC = $controller('DeleteModalInstanceController as deleteModalInstanceController', {
				$scope: scope,
				$uibModalInstance: modalInstance,
				records: recordsColumnMock,
				typeOfRecords: typeOfRecords
			});
		});

		it('should be registered', function() {
			expect(DeleteModalInstanceControllerInstanceUIC).toBeDefined();
		});

		it('should put the resolved list of records onto the controller\'s records object', function(){
			expect(DeleteModalInstanceControllerInstanceUIC.records).toEqual(recordsColumnMock);
		});

		it('should define functions for the submit and cancel buttons', function(){
			expect(DeleteModalInstanceControllerInstanceUIC.resolve).toBeDefined();
			expect(DeleteModalInstanceControllerInstanceUIC.reject).toBeDefined();
		});

		describe('resolve(): ', function() {
			it('should call through to the $uibModalInstance and close the window', function(){
				DeleteModalInstanceControllerInstanceUIC.resolve();
				expect(modalInstance.close).toHaveBeenCalled();
			});
		});

		describe('reject(): ', function() {
			it('should call through to the $uibModalInstance and dismiss the window', function(){
				DeleteModalInstanceControllerInstanceUIC.reject();
				expect(modalInstance.dismiss).toHaveBeenCalled();
			});
		});
	});
});