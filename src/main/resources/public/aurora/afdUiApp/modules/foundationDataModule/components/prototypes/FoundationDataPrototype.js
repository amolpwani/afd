'use strict';

//noinspection JSValidateJSDoc
/**
 * @ngdoc service
 * @module AfdUiAppFoundationDataComponentsModule
 * @name FoundationDataPrototype
 * @description
 * This service holds all the Foundation Data information
 * @requires $filter
 */
angular.module('AfdUiAppFoundationDataComponentsModule')
    .factory('FoundationDataPrototype', ['$filter', function ($filter) {

        /**
         * @ngdoc method
         * @name FoundationDataPrototype
         * @methodOf FoundationDataPrototype
         * @params {object} foundationDataColumnObject
         * @description This is a constructor sets the initial values to booking fields.
         */
        function FoundationDataPrototype(foundationDataColumnObject) {
            
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

        FoundationDataPrototype.prototype = {
            createFrom: function (foundationDataColumnObject) {
                if (foundationDataColumnObject) {
                    _.merge(this, foundationDataColumnObject);
                }
            },
            compareTo: function (foundationDataColumnObject) {
                return (this.id === foundationDataColumnObject.id);
            }
        };

        return FoundationDataPrototype;
    }]);
