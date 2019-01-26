/**
 * Utility for getting elements based on selectors and getting, setting and toggling of class of any element
 * @author Subham Vishal
 */
/**
 * define function()
 * The specification defines a single function "define" that is available as a free variable or a global variable.  
 * factory function()
 * Factory is a function that should be executed to instantiate the module or an object. 
 * @returns {function} getElement
 * @returns {function} addClass
 * @returns {function} removeClass
 * @returns {function} checkClass
 */
define(function () {

    /**
    * @function getElement
    * @description returns elements based on the selector value
    * @param {string} selector
    * @returns {string} selector 
    */
    function getElement(selector) {
        if (/^#[a-zA-Z0-9]+/.test(selector)) {
            var elementId = selector.substr(1);
            return document.getElementById(elementId);
        } else if (/^\.[a-zA-Z0-9]+/.test(selector)) {
            var elementClass = selector.substr(1);
            return document.getElementsByClassName(elementClass);
        }
        return document.querySelectorAll(selector);
    }

    /**
     * @function addClass
     * @description adds a class to an element
     * @param {string} element 
     * @param {string} cssClass
     * @returns none 
     */
    function addClass(element, cssClass) {
        element.classList.add(cssClass);
    }

    /**
     * @function removeClass
     * @description removes a class from an element
     * @param {string} element 
     * @param {string} cssClass
     * @returns none 
     */
    function removeClass(element, cssClass) {
        element.classList.remove(cssClass);
    }

    /**
     * @function checkClass
     * @description checks if the element has the given class is added to it or not
     * @param {string} element 
     * @param {string} cssClass 
     * @returns none
     */
    function checkClass(element, cssClass) {
        return element.classList.contains(cssClass);
    }

    return {
        getElement: getElement,
        addClass: addClass,
        removeClass: removeClass,
        checkClass: checkClass,
    }

});
