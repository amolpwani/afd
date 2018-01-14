'use strict';

//noinspection JSValidateJSDoc
/**
 * @ngdoc service
 * @module AfdUiAppListComponentsModule
 * @name ListPrototype
 * @description
 * This service holds all the booking information
 * @requires CustomerPrototype
 * @requires AdventurePrototype
 * @requires FlightPrototype
 * @requires $filter
 */
angular.module('AfdUiAppListModule')
    .factory('ListPrototype', ['$filter', function ($filter) {

        /**
         * @ngdoc method
         * @name ListPrototype
         * @methodOf ListPrototype
         * @params {object} listObject
         * @description This is a constructor sets the initial values to booking fields.
         */
        function ListPrototype(listObject) {
            this.id = '';
            this.name = '';
            this.description = null;
            this.active = false;

            if (listObject) {
                _.merge(this, listObject);
            }
        }

        ListPrototype.prototype = {
            createFrom: function (listObject) {
                if (listObject) {
                    _.merge(this, listObject);
                }
            },
            compareTo: function (listObject) {
                return (this.id === listObject.id);
            }
        };

        return ListPrototype;
    }]);
