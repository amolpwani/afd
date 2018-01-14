'use strict';

//noinspection JSValidateJSDoc
/**
 * @ngdoc service
 * @module AfdUiAppListItemComponentsModule
 * @name ListItemPrototype
 * @description
 * This service holds all the booking information
 * @requires CustomerPrototype
 * @requires AdventurePrototype
 * @requires FlightPrototype
 * @requires $filter
 */
angular.module('AfdUiAppListItemComponentsModule')
    .factory('ListItemPrototype', ['$filter', function ($filter) {

        /**
         * @ngdoc method
         * @name ListItemPrototype
         * @methodOf ListItemPrototype
         * @params {object} listObject
         * @description This is a constructor sets the initial values to booking fields.
         */
        function ListItemPrototype(listObject) {
            this.id = '';
            this.name = '';
            this.description = null;
            this.active = false;

            if (listObject) {
                _.merge(this, listObject);
            }
        }

        ListItemPrototype.prototype = {
            createFrom: function (listObject) {
                if (listObject) {
                    _.merge(this, listObject);
                }
            },
            compareTo: function (listObject) {
                return (this.id === listObject.id);
            }
        };

        return ListItemPrototype;
    }]);
