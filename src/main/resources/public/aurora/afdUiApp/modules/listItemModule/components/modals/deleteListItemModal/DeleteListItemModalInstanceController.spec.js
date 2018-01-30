'use strict';

describe('AfdUiAppListItemComponentsModule DeleteListItemModalInstanceController:', function() {
	beforeEach(module('AfdUiAppListItemComponentsModule'));

	describe('', function() {
		var DeleteListItemsModalInstanceUIC = null,
			scope = null, $controller,
			modalInstance, listItemsMock;

		listItemsMock = ['1', '2'];

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

			DeleteListItemsModalInstanceUIC = $controller('DeleteListItemModalInstanceController as deleteListItemModalInstanceController', {
				$scope: scope,
				$uibModalInstance: modalInstance,
				listItems: listItemsMock
			});
		});

		it('should be registered', function() {
			expect(DeleteListItemsModalInstanceUIC).toBeDefined();
		});

		it('should put the resolved list of listItems onto the controller\'s listItems object', function(){
			expect(DeleteListItemsModalInstanceUIC.listItems).toEqual(listItemsMock);
		});

		it('should define functions for the submit and cancel buttons', function(){
			expect(DeleteListItemsModalInstanceUIC.resolve).toBeDefined();
			expect(DeleteListItemsModalInstanceUIC.reject).toBeDefined();
		});

		describe('resolve(): ', function() {
			it('should call through to the $uibModalInstance and close the window', function(){
				DeleteListItemsModalInstanceUIC.resolve();
				expect(modalInstance.close).toHaveBeenCalled();
			});
		});

		describe('reject(): ', function() {
			it('should call through to the $uibModalInstance and dismiss the window', function(){
				DeleteListItemsModalInstanceUIC.reject();
				expect(modalInstance.dismiss).toHaveBeenCalled();
			});
		});
	});
});