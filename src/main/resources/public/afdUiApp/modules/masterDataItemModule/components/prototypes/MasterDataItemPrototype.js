'use strict';

//noinspection JSValidateJSDoc
/**
 * @ngdoc service
 * @module AfdUiAppMasterDataItemComponentsModule
 * @name MasterDataItemPrototype
 * @description
 * This service holds all the booking information
 * @requires CustomerPrototype
 * @requires AdventurePrototype
 * @requires FlightPrototype
 * @requires $filter
 */
angular.module('AfdUiAppMasterDataItemComponentsModule')
    .factory('MasterDataItemPrototype', ['$filter', function ($filter) {

        /**
         * @ngdoc method
         * @name MasterDataItemPrototype
         * @methodOf MasterDataItemPrototype
         * @params {object} masterItemObject
         * @description This is a constructor sets the initial values to booking fields.
         */
        function MasterDataItemPrototype(masterItemObject) {
            this.id = '';
            this.code = '';
            this.description = null;
            this.active = false;

            if (masterItemObject) {
                _.merge(this, masterItemObject);
            }
        }

        MasterDataItemPrototype.prototype = {
            createFrom: function (masterItemObject) {
                if (masterItemObject) {
                    _.merge(this, masterItemObject);
                }
            },
            compareTo: function (masterItemObject) {
                return (this.id === masterItemObject.id);
            }
        };

        return MasterDataItemPrototype;
    }]);
