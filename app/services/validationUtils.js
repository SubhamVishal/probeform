/**
* Utility for form validation
* @author Subham Vishal
*/
/**
* define function()
* The specification defines a single function "define" that is available as a free variable or a global variable. 
 * Dependencies - elementUtils
* Dependencies is an array literal of the module ids that are dependencies required by the module that is being defined.
* factory function()
* Factory is a function that should be executed to instantiate the module or an object.
* @param {object} elementUtils
* @returns {function} generalValidation
* @returns {function} passwordMatchValidation
* @returns {function} locationMatchValidation
* @returns {function} currentFormHandler
*/
define(['services/elementUtils', 'app/common/constants'], function (elementUtils,constants) {
    /**
     *@function _formFieldValidator
     *@description validates form inputs
     *@param {object} e
     *@returns {boolean}
     */
    function _formFieldValidator(e) {
        var invokingElement = e.target;
        if (invokingElement.maxLength > 0 && invokingElement.value.length > invokingElement.maxLength) {
            elementUtils.getElement("#" + invokingElement.name).innerHTML = "Please input less than" + invokingElement.maxLength + "characters";
            return false;
        }
        if (invokingElement.minLength > 0  && invokingElement.value.length < invokingElement.minLength) {
            elementUtils.getElement("#" + invokingElement.name).innerHTML = "Please input atleast " + invokingElement.minLength + " characters";
            return false;
        }
        if (invokingElement.pattern) {
            var regex = RegExp(invokingElement.pattern);
            if (!(regex.test(invokingElement.value))) {
                elementUtils.getElement("#" + invokingElement.name).innerHTML = invokingElement.getAttribute("errorMsg");
                return false;
            } else {
                elementUtils.getElement("#" + invokingElement.name).innerHTML = "";
                return true;
            }

        } else {
            return false;
        }
        elementUtils.getElement("#" + invokingElement.name).innerHTML = "";
        return true;
    };
    /**
     * @function _indexValue
     * @description returns the index of "confirm the password" input field
     * @param {String} rePasswordField 
     * @returns {number} i
     */
    function _indexValue(rePasswordField) {
        var parentLength = rePasswordField.parentNode.length;
        for (i = 0; i < parentLength; i++) {
            if (rePasswordField === rePasswordField.parentNode.elements[i]) {
                return i;
            }
        }
    };
    /**
     * @function _rePasswordChecker
     * @description matches the password and confirm password input field
     * @param {object} e 
     * @returns {boolean}
     */
    function _rePasswordChecker(e) {
        var invokingElement = e.target;
        var rePasswordValue = invokingElement.parentNode.elements[_indexValue(invokingElement)].value;
        var passwordValue = invokingElement.parentNode.elements[(_indexValue(invokingElement)) - 1].value
        if (!(passwordValue === rePasswordValue)) {
            elementUtils.getElement("#" + invokingElement.name).innerHTML = constants.PASSWORDS_NOT_MATCH;
            return false;
        }
        elementUtils.getElement("#" + invokingElement.name).innerHTML = "";
        return true;
    };
    /**
     * @function _locationChecker
     * @description checks whether the entered location is available or not
     * @param {object} e 
     * @returns {boolean}
     */
    function _locationChecker(e) {
        var invokingElement = e.target;
        var enteredLocation = invokingElement.value;
        var count = 0;
        var locationsAvailable = ["Gurgaon", "Noida", "Mumbai", "Bangalore"];
        var totalLocations = locationsAvailable.length
        for (var j = 0; j < totalLocations; j++) {
            if (enteredLocation === locationsAvailable[j]) {
                count++;
            }
        }
        if (count) {
            elementUtils.getElement("#" + invokingElement.name).innerHTML = "";
            return true;
        } else {
            elementUtils.getElement("#" + invokingElement.name).innerHTML = constants.LOCATION_UNAVAILABLE;
            return false;
        }
    };
    /**
     * @function _submitHandler 
     * @description handles the entire form submition based on input field's values.
     * @param {object} e
     * @returns {boolean} 
     */
    function _submitHandler(e) {
        e.preventDefault();
        var invokingElement = e.target;
        var flag = false;
        var formLength = invokingElement.length;
        for (var index = 0; index < formLength; index++) {
            if ((elementUtils.getElement("#" + invokingElement.elements[index].id).type === "text") || (elementUtils.getElement("#" + invokingElement.elements[index].id).type === "email") || (elementUtils.getElement("#" + invokingElement.elements[index].id).type === "password")) {
                if (elementUtils.getElement("#" + invokingElement.elements[index].name) && !(elementUtils.getElement("#" + invokingElement.elements[index].name).innerHTML === "") || (elementUtils.getElement("#" + invokingElement.elements[index].id).value === "")) {
                    elementUtils.getElement("#" + invokingElement.name).innerHTML = constants.FILL_FORM_CORRECTLY;
                    return false;
                }
            }
            else {
                continue;
            }
            flag = true;
        }
        return flag;
    };
    /**
     * @function generalValidation
     * @description returns _formFieldValidator function
     * @param {object} e
     * @returns {function} _formFieldValidator
     */
    function generalValidation(e) {
        return _formFieldValidator(e);
    };
    /**
     * @function passwordMatchValidation
     * @description returns _rePasswordChecker function
     * @param {object} e
     * @returns {function} _rePasswordChecker 
     */
    function passwordMatchValidation(e) {
        return _rePasswordChecker(e);
    };
    /**
    * @function locationmatchValidation
     * @description returns _locationChecker function
     * @param {object} e
     * @returns {function} _locationChecker
     */
    function locationMatchValidation(e) {
        return _locationChecker(e);
    };
    /**
     * @function currentFormHandler
     * @description returns _submitHandler function
     * @param {object} e
     * @returns {function} _submitHandler
     */
    function currentFormHandler(e) {
        return _submitHandler(e);
    };
    return {
        generalValidation: generalValidation,
        passwordMatchValidation: passwordMatchValidation,
        locationMatchValidation: locationMatchValidation,
        currentFormHandler: currentFormHandler
    }
})