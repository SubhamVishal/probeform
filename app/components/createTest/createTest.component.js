/**
 * Functionality of create test page defined
 * @author Sukhber Bansal
 */
/**
 * define function()
 * The specification defines a single function "define" that is available as a free variable or a global variable. 
 * Dependencies - eventUtils, validationUtils
 * Dependencies is an array literal of the module ids that are dependencies required by the module that is being defined.
 * factory function()
 * Factory is a function that should be executed to instantiate the module or an object.
 * @param {object} eventUtils
 * @param {object} validation
 * @param {object} elementUtils
 * @returns none
 */
define(['app/services/eventUtils', 'app/services/validationUtils', 'app/services/elementUtils'], function (eventUtils, validation, elementUtils) {
    /** 
     * @function anonymous
     * @description self invoking function which creates a test
     * @returns none
     */
    (function () {
        eventUtils.addListener("#createTestTestName", "change", function (event) {
            validation.generalValidation(event);
        });
        eventUtils.addListener("#createTestTestName", "focus", function () {
            elementUtils.getElement("#createTestForm").innerHTML="";
        });

        eventUtils.addListener("#createTestShortNameDesktop", "change", function (event) {
            validation.generalValidation(event);
        });
        eventUtils.addListener("#createTestShortNameDesktop", "focus", function () {
            elementUtils.getElement("#createTestForm").innerHTML="";
        });

        eventUtils.addListener("#submitTestButton", "click", function (event) {
            event.preventDefault();
            elementUtils.getElement("#createTestform").reset();
        });
    })();
})