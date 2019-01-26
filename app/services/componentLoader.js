/**
 * Functionality to load components
 *@author Poonam Bansal 
 */
/**
 * define function()
 * The specification defines a single function "define" that is available as a free variable or a global variable. 
 * Dependencies - elementUtils
 * Dependencies is an array literal of the module ids that are dependencies required by the module that is being defined.
 * factory function()
 * Factory is a function that should be executed to instantiate the module or an object.
 * @param {object} elementUtils
 * @returns {function} loadComponent
 * @returns {function} clearContent
 */
define(['app/services/elementUtils'], function (elementUtils) {
	/**
	 * @function loadComponent
	 * @description loads a component
	 * @param {object} componentHtml 
	 * @param {string} selector
	 * @returns none 
	 */
	function loadComponent(componentHtml, selector) {
		var element = elementUtils.getElement(selector);
		element.innerHTML = componentHtml;
	};
	/**
	 * @function clearContent
	 * @description removes content of a component
	 * @param {string} selector
	 * @returns none 
	 */
	function clearContent(selector) {
		var element = elementUtils.getElement(selector);
		element.innerHTML = "";
	};
	return {
		loadComponent: loadComponent,
		clearContent: clearContent
	}

})