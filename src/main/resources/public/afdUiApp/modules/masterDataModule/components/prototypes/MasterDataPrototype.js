'use strict';

//noinspection JSValidateJSDoc
/**
 * @ngdoc service
 * @module AfdUiAppMasterDataComponentsModule
 * @name MasterDataPrototype
 * @description
 * This service holds all the booking information
 * @requires CustomerPrototype
 * @requires AdventurePrototype
 * @requires FlightPrototype
 * @requires $filter
 */
angular.module('AfdUiAppMasterDataComponentsModule')
    .factory('MasterDataPrototype', ['$filter', function ($filter) {

        /**
         * @ngdoc method
         * @name MasterDataPrototype
         * @methodOf MasterDataPrototype
         * @params {object} masterDataObject
         * @description This is a constructor sets the initial values to booking fields.
         */
        function MasterDataPrototype(masterDataObject) {
            this.id = '';
            this.name = '';
            this.description = null;
            this.active = false;

            if (masterDataObject) {
                _.merge(this, masterDataObject);
            }
        }

        MasterDataPrototype.prototype = {
            createFrom: function (masterDataObject) {
                if (masterDataObject) {
                    _.merge(this, masterDataObject);
                }
            },
            compareTo: function (masterDataObject) {
                return (this.id === masterDataObject.id);
            }
        };

        return MasterDataPrototype;
    }]);
