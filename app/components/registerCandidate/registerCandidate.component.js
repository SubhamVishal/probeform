/**
 * Functionality of register candidate page
 * @author Sukhber Bansal
 */
/**
 * define function()
 * The specification defines a single function "define" that is available as a free variable or a global variable. 
 * Dependencies - eventUtils, validationUtils, elementUtils
 * Dependencies is an array literal of the module ids that are dependencies required by the module that is being defined.
 * factory function()
 * Factory is a function that should be executed to instantiate the module or an object.
 * @param {object} eventUtils
 * @param {object} validation
 * @param {object} elementUtils
 * @returns none
 */
define(['app/services/eventUtils', 'app/services/validationUtils','app/services/elementUtils'], function (eventUtils, validation,elementUtils) {
    /**
      * @function anonymous
      * @description self invoking function which defines the overall functionality of register candidate page 
      * @returns none 
      */
    (function () {
        eventUtils.addListener("#registerCandidateFullName", "change", function (event) {
            validation.generalValidation(event);
        });
        eventUtils.addListener("#registerCandidateFullName", "focus", function () {
            elementUtils.getElement("#registerCandidateName").innerHTML="";
        });
        eventUtils.addListener("#registerCandidatePhoneNumber", "change", function (event) {
            validation.generalValidation(event);
        });
        eventUtils.addListener("#registerCandidatePhoneNumber", "focus", function () {
            elementUtils.getElement("#registerCandidateName").innerHTML="";
        });
        eventUtils.addListener("#registerCandidateEmail", "change", function (event) {
            validation.generalValidation(event);
        });
        eventUtils.addListener("#registerCandidateEmail", "focus", function () {
            elementUtils.getElement("#registerCandidateName").innerHTML="";
        });
        eventUtils.addListener("#registerCandidateButton", "click", function (event) {
            event.preventDefault();
            elementUtils.getElement("#registerCandidateId").reset();
        });
    })();
});