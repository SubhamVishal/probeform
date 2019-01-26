/**
 * Utility for displaying a modal
 * @author Akshita Garg
 */
/**
 * define function()
 * The specification defines a single function "define" that is available as a free variable or a global variable. 
 * Dependencies - elementUtils
 * Dependencies is an array literal of the module ids that are dependencies required by the module that is being defined.
 * factory function()
 * Factory is a function that should be executed to instantiate the module or an object.
 * @param {object} elementUtils
 * @returns {function} display
 * @returns {function} hide
 */

define(['services/elementUtils'], function (elementUtils) {

    /**
     * @function display
     * @description displays the modal and blurs the background.
     * @param  modalDisplay 
     * @param  modalHide
     * @returns none 
     */
    function display(modalDisplay, modalHide) {
        elementUtils.removeClass(modalHide, "focus");
        elementUtils.removeClass(header, "focus");
        elementUtils.removeClass(navBar, "focus");
        elementUtils.removeClass(footer, "focus");
        elementUtils.removeClass(modalDisplay, "hide");
        elementUtils.addClass(modalDisplay, "show");
        elementUtils.addClass(modalHide, "blur");
        elementUtils.addClass(header, "blur");
        elementUtils.addClass(navBar, "blur");
        elementUtils.addClass(footer, "blur");
    };

    /**
     * @function hide
     * @description hides the modal and displays the background.
     * @param  modalDisplay 
     * @param  modalHide 
     * @returns none     
     */
    function hide(modalHide, modalDisplay) {
        elementUtils.removeClass(modalHide, "show");
        elementUtils.removeClass(modalDisplay, "blur");
        elementUtils.removeClass(header, "blur");
        elementUtils.removeClass(navBar, "blur");
        elementUtils.removeClass(footer, "blur");
        elementUtils.addClass(modalDisplay, "focus");
        elementUtils.addClass(header, "focus");
        elementUtils.addClass(navBar, "focus");
        elementUtils.addClass(footer, "focus");
        elementUtils.addClass(modalHide, "hide");
    };

    /**
	 * @function anonymous
	 * @description self invoking function which gets required elements from the DOM
	 * @returns none
	 */
    (function () {
        var header = elementUtils.getElement('#header'),
            navBar = elementUtils.getElement('#navBar'),
            footer = elementUtils.getElement('#footer');
    })();
    return {
        display: display,
        hide: hide
    }
});
