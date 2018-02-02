'use strict';

describe('AfdUiAppFoundationDataColumnComponentsModule DeleteFoundationDataColumnModalInstanceController:', function() {
	beforeEach(module('AfdUiAppFoundationDataColumnComponentsModule'));

	describe('', function() {
		var DeleteFoundationDataColumnModalInstanceControllerInstanceUIC = null,
			scope = null, $controller,
			modalInstance, foundationDataColumnMock;

		foundationDataColumnMock = ['1', '2'];

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

			DeleteFoundationDataColumnModalInstanceControllerInstanceUIC = $controller('DeleteFoundationDataColumnModalInstanceController as deleteFoundationDataColumnModalInstanceController', {
				$scope: scope,
				$uibModalInstance: modalInstance,
				foundationDataColumns: foundationDataColumnMock
			});
		});

		it('should be registered', function() {
			expect(DeleteFoundationDataColumnModalInstanceControllerInstanceUIC).toBeDefined();
		});

		it('should put the resolved list of foundationDataColumns onto the controller\'s foundationDataColumns object', function(){
			expect(DeleteFoundationDataColumnModalInstanceControllerInstanceUIC.foundationDataColumns).toEqual(foundationDataColumnMock);
		});

		it('should define functions for the submit and cancel buttons', function(){
			expect(DeleteFoundationDataColumnModalInstanceControllerInstanceUIC.resolve).toBeDefined();
			expect(DeleteFoundationDataColumnModalInstanceControllerInstanceUIC.reject).toBeDefined();
		});

		describe('resolve(): ', function() {
			it('should call through to the $uibModalInstance and close the window', function(){
				DeleteFoundationDataColumnModalInstanceControllerInstanceUIC.resolve();
				expect(modalInstance.close).toHaveBeenCalled();
			});
		});

		describe('reject(): ', function() {
			it('should call through to the $uibModalInstance and dismiss the window', function(){
				DeleteFoundationDataColumnModalInstanceControllerInstanceUIC.reject();
				expect(modalInstance.dismiss).toHaveBeenCalled();
			});
		});
	});
});