'use strict';

//noinspection JSValidateJSDoc
/**
 * @ngdoc service
 * @module AfdUiAppListComponentsModule
 * @name ListItemPrototype
 * @description
 * This service holds all the booking information
 * @requires CustomerPrototype
 * @requires AdventurePrototype
 * @requires FlightPrototype
 * @requires $filter
 */
angular.module('AfdUiAppListModule')
    .factory('ListItemPrototype', ['$filter', function ($filter) {

        /**
         * @ngdoc method
         * @name ListItemPrototype
         * @methodOf ListItemPrototype
         * @params {object} listItemObject
         * @description This is a constructor sets the initial values to booking fields.
         */
        function ListItemPrototype(listItemObject) {
            this.id = '';
            this.code = '';
            this.description = null;
            this.active = false;

            if (listItemObject) {
                _.merge(this, listItemObject);
            }
        }

        ListItemPrototype.prototype = {
            createFrom: function (listItemObject) {
                if (listItemObject) {
                    _.merge(this, listItemObject);
                }
            },
            compareTo: function (listItemObject) {
                return (this.id === listItemObject.id);
            }
        };

        return ListItemPrototype;
    }]);
