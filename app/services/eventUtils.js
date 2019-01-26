/**
 * Registers an event on HTML element when required
 *@author Poonam Bansal and Akshita Garg
 */
/**
 * define function()
 * The specification defines a single function "define" that is available as a free variable or a global variable. 
 * Dependencies - elementUtils
 * Dependencies is an array literal of the module ids that are dependencies required by the module that is being defined.
 * factory function()
 * Factory is a function that should be executed to instantiate the module or an object.
 * @param {object} elementUtils
 * @returns {function} addListener 
 */

define(['services/elementUtils'], function (elementUtils) {

	/**
	 * @function addListener 
	 * @description registers the event
	 * @param {string} elementSelector 
	 * @param {object} event 
	 * @param {object} handler
	 * @returns none 
	 */
	function addListener(elementSelector, event, handler) {
		var selector = elementSelector.substr(0, 1);
		if (selector === '#') {
			var element = elementUtils.getElement(elementSelector);
			try {
				if (document.addEventListener) {
					element.addEventListener(event, handler);
				} else if (document.attachEvent) {
					element.attachEvent(event, handler);
				}
			} catch (e) {
				console.error(e.name + " occurred while using this selector ");
			}
		}
		else {
			var elements = elementUtils.getElement(elementSelector),
				elementsLength = elements.length;
			for (var index = 0; index < elementsLength; index++) {
				try {
					if (document.addEventListener) {
						elements[index].addEventListener(event, handler);
					} else if (document.attachEvent) {
						elements[index].attachEvent(event, handler);
					}
				} catch (e) {
					console.error(e.name + " occurred while using this selector ");
				}
			}
		}
	};
	return {
		addListener: addListener
	}
})