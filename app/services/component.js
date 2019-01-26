/**
 * Functionality of create test page defined
 * @author Sukhber Bansal
 */
/**
 * define function()
 * The specification defines a single function "define" that is available as a free variable or a global variable. 
 * Dependencies - components, ajax
 * Dependencies is an array literal of the module ids that are dependencies required by the module that is being defined.
 * factory function()
 * Factory is a function that should be executed to instantiate the module or an object.
 * @param {object} commonComponents
 * @param {object} ajax
 * @returns {function} render
 */define(['app/common/components','app/services/ajax'], function (commonComponents,ajax) {
	/** 
     * @function _localAjax
	 * @description performs an ajax call to a component and loads its HTML, JavaScript and CSS respectively.
     * @param {object} component
     * @returns none
     */
	function _localAjax(component) {
		var url = component.getAttribute('data-component'),
			_self = this;
		ajax.get(commonComponents[url].template, function(responseText){
			component.innerHTML = responseText;
			require([commonComponents[url].js], function (comp) {
				comp && comp.render && comp.render();
			});
			var css = document.createElement("link");
				css.href = commonComponents[url].css;
				css.rel = "stylesheet";
				document.head.appendChild(css);
		});
}
	/** 
     * @function _localComp
	 * @description calls the _localAjax function
     * @param {object} component
     * @returns none
     */
	function _loadComp() {
		var componentPlaceholders = document.getElementsByClassName('component-loader');
		Array.prototype.slice.call(componentPlaceholders).forEach(function (item, index) {
			_localAjax(item);
		});
	}

	return {
		render: function render() {
			_loadComp();
		}
	}
});