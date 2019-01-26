/**
 * Functionality of sign up form
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
      * @description self invoking function which defines the overall functionality of sign up page  
      * @returns none 
      */
    (function () {
        eventUtils.addListener("#signupFullName", "change", function (event) {
            validation.generalValidation(event);
        });
        eventUtils.addListener("#signupFullName", "focus", function () {
            elementUtils.getElement("#signupFormName").innerHTML="";
        });

        eventUtils.addListener("#signupOracleId", "change", function (event) {
            validation.generalValidation(event);
        });
        eventUtils.addListener("#signupOracleId", "focus", function () {
            elementUtils.getElement("#signupFormName").innerHTML="";
        });

        eventUtils.addListener("#signupEmail", "change", function (event) {
            validation.generalValidation(event);
        });
        eventUtils.addListener("#signupEmail", "focus", function () {
            elementUtils.getElement("#signupFormName").innerHTML="";
        });

        eventUtils.addListener("#signupPhone", "change", function (event) {
            validation.generalValidation(event);
        });
        eventUtils.addListener("#signupPhone", "focus", function () {
            elementUtils.getElement("#signupFormName").innerHTML="";
        });

        eventUtils.addListener("#signupLocation", "change", function (event) {
            validation.locationMatchValidation(event);
        });
        eventUtils.addListener("#signupLocation", "focus", function () {
            elementUtils.getElement("#signupFormName").innerHTML="";
        });

        eventUtils.addListener("#signupPassword", "change", function (event) {
            validation.generalValidation(event);
        });
        eventUtils.addListener("#signupPassword", "focus", function () {
            elementUtils.getElement("#signupFormName").innerHTML="";
        });

        eventUtils.addListener("#signupConfirmPassword", "change", function (event) {
            validation.passwordMatchValidation(event);
        });
        eventUtils.addListener("#signupConfirmPassword", "focus", function () {
            elementUtils.getElement("#signupFormName").innerHTML="";
        });

        eventUtils.addListener("#signupFormId", "submit", function (event) {
            validation.currentFormHandler(event);
        });
    })();
})