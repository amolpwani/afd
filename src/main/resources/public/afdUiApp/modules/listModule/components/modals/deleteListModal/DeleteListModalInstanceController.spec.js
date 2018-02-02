'use strict';

describe('AfdUiAppListComponentsModule DeleteListModalInstanceController:', function() {
	beforeEach(module('AfdUiAppListComponentsModule'));

	describe('', function() {
		var DeleteListsModalInstanceUIC = null,
			scope = null, $controller,
			modalInstance, listsMock;

		listsMock = ['1', '2'];

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

			DeleteListsModalInstanceUIC = $controller('DeleteListModalInstanceController as deleteListModalInstanceController', {
				$scope: scope,
				$uibModalInstance: modalInstance,
				lists: listsMock
			});
		});

		it('should be registered', function() {
			expect(DeleteListsModalInstanceUIC).toBeDefined();
		});

		it('should put the resolved list of lists onto the controller\'s lists object', function(){
			expect(DeleteListsModalInstanceUIC.lists).toEqual(listsMock);
		});

		it('should define functions for the submit and cancel buttons', function(){
			expect(DeleteListsModalInstanceUIC.resolve).toBeDefined();
			expect(DeleteListsModalInstanceUIC.reject).toBeDefined();
		});

		describe('resolve(): ', function() {
			it('should call through to the $uibModalInstance and close the window', function(){
				DeleteListsModalInstanceUIC.resolve();
				expect(modalInstance.close).toHaveBeenCalled();
			});
		});

		describe('reject(): ', function() {
			it('should call through to the $uibModalInstance and dismiss the window', function(){
				DeleteListsModalInstanceUIC.reject();
				expect(modalInstance.dismiss).toHaveBeenCalled();
			});
		});
	});
});