/**
 * Functionality of login form
 * @author Sukhber Bansal
 */
/**
 * define function()
 * The specification defines a single function "define" that is available as a free variable or a global variable. 
 * Dependencies - eventUtils, ajax, validationUtils, constants, elementUtils
 * Dependencies is an array literal of the module ids that are dependencies required by the module that is being defined.
 * factory function()
 * Factory is a function that should be executed to instantiate the module or an object.
 * @param {object} eventUtils
 * @param {object} ajax
 * @param {object} validation
 * @param {object} constants
 * @param {object} elementUtils
 * @returns none
 */
define(['app/services/eventUtils', 'app/services/ajax', 'app/services/validationUtils','app/common/constants','app/services/elementUtils'], function (eventUtils, ajax, validationUtils, constants, elementUtils) {
    /**
     * @function checkLogin
     * @description checks for valid login attempt
     * @param {object} e
     * @returns none 
     */
    function checkLogin(e) {
        if(validationUtils.currentFormHandler(event))
        {   
            ajax.get("mock/login-data.json", check);
        }     
    }
     /**
      * @function check
      * @description enables login on correct login credentials
      * @param {object} text
      * @param {string} selector
      * @returns none 
      */
    function check(text, selector) {
        login_objects = JSON.parse(text);
        var idx = 0;
        while (idx < login_objects.length) {
            if (document.forms["loginFormName"]["loginfullName"].value === login_objects[idx].name && document.forms["loginFormName"]["loginpassword"].value === login_objects[idx].password)
                break;
            idx++;
        }
        if (idx === login_objects.length) {
            elementUtils.getElement("#loginFormName").innerHTML = constants.INVALID_CONTENT;
            document.loginFormName.reset();
            return false;
        }
        else {
            if (document.getElementById("rememberMe").checked) {
                localStorage.setItem("username", document.forms["loginFormName"]["loginfullName"].value);
                localStorage.setItem("role", login_objects[idx].role);
            }

            sessionStorage.setItem("username", document.forms["loginFormName"]["loginfullName"].value);
            sessionStorage.setItem("role", login_objects[idx].role);
            var role = sessionStorage.getItem("role");

            if (role === 'interviewer')
                window.location.href = '#interviewerDashboard';
            else {
                window.location.href = '#hrDashboard';
            }

        }
    }
     /**
      * @function anonymous
      * @description self invoking function which defines the overall functionality   
      * @returns none 
      */
    (function () {
        eventUtils.addListener("#lostPassword", "click", function (e) {
            e.preventDefault();
            elementUtils.getElement("#loginFormName").innerHTML = constants.OTP_MESSAGE;
        });
        eventUtils.addListener("#loginFullName", "change", function (event) {
            validationUtils.generalValidation(event);
        });
        eventUtils.addListener("#loginFullName", "focus", function () {
            elementUtils.getElement("#loginFormName").innerHTML="";
        });

        eventUtils.addListener("#loginFormId", "submit", checkLogin.bind(this));
        
    })();

})
