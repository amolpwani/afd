'use strict';

//noinspection JSValidateJSDoc
/**
 * @ngdoc service
 * @module AfdUiAppListComponentsModule
 * @name FoundationDataColumnPrototype
 * @description
 * This service holds all the booking information
 * @requires CustomerPrototype
 * @requires AdventurePrototype
 * @requires FlightPrototype
 * @requires $filter
 */
angular.module('AfdUiAppFoundationDataColumnComponentsModule')
    .factory('FoundationDataColumnPrototype', ['$filter', function ($filter) {

        /**
         * @ngdoc method
         * @name FoundationDataColumnPrototype
         * @methodOf FoundationDataColumnPrototype
         * @params {object} foundationDataColumnObject
         * @description This is a constructor sets the initial values to booking fields.
         */
        function FoundationDataColumnPrototype(foundationDataColumnObject) {
            
    	    this.uiColumnName = '';
    	    this.hoverHelp = '';
    	    this.uniqueColumn = false;
    	    this.inputType = 'Text';
    	    this.selectedList = '';
    	    this.listDisplayType = '';
    	    this.value = '';
    	    this.mandatory = false;
    	    this.sortOrder = 0;
    	    this.editable = false;
    	    this.length = 0;
    	    this.selectedListId = 1;

            if (foundationDataColumnObject) {
                _.merge(this, foundationDataColumnObject);
            }
        }

        FoundationDataColumnPrototype.prototype = {
            createFrom: function (foundationDataColumnObject) {
                if (foundationDataColumnObject) {
                    _.merge(this, foundationDataColumnObject);
                }
            },
            compareTo: function (foundationDataColumnObject) {
                return (this.id === foundationDataColumnObject.id);
            }
        };

        return FoundationDataColumnPrototype;
    }]);
