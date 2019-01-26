/**
 * Functionality of show results table page
 * @author Pranik Sidana
 */
/**
 * define function()
 * The specification defines a single function "define" that is available as a free variable or a global variable. 
 * Dependencies - , eventUtils,elementUtils, ajax, showResultTable
 * Dependencies is an array literal of the module ids that are dependencies required by the module that is being defined.
 * factory function()
 * Factory is a function that should be executed to instantiate the module or an object.
 * @param {object} ajax
 * @param {object} elementUtils
 * @param {object} eventUtils
 * @param {object} modal
 * @param {object} resultDetails.component
 * @param {object} componentLoader
 * @returns {function} _displayModal
 */
define(['app/services/ajax', 'app/services/elementUtils', 'app/services/eventUtils', 'app/services/modal', 'app/components/resultDetails/resultDetails.component', 'app/services/componentLoader'], function (ajax, elementUtils, eventUtils, modal, resultTable, componentLoader) {
	var resultDetails = elementUtils.getElement('#resultDetails'),
		showResults = elementUtils.getElement('#showResults');
		/**
		 * @function _datashow
		 * @description populates the data in the table
		 * @param {object} fileData 
		 * @param {string} selector
		 * @returns none
		 */
		function _datashow(fileData, selector) {
		var i,
			data = JSON.parse(fileData),
			clone,
			index,
			loopUntil = data.length;
		for (index = 0; index < loopUntil; index++) {
			clone = elementUtils.getElement('template')[0].content.cloneNode(true);
			elementUtils.getElement('#tbody').appendChild(clone);
			elementUtils.getElement('.js-image-show')[index].setAttribute("src", data[index].imgurl);
			elementUtils.getElement('.js-p-name')[index].innerHTML = data[index].candidateName;
			elementUtils.getElement('.js-p-oid')[index].innerHTML = data[index].oracleId;
			elementUtils.getElement('.js-p-test')[index].innerHTML = data[index].Test;
			elementUtils.getElement('.js-p-email')[index].innerHTML = data[index].email;
			elementUtils.getElement('.js-p-date')[index].innerHTML = data[index].Date;
			elementUtils.getElement('.js-p-score')[index].innerHTML = data[index].score;
		}
		for (index = 0; index < loopUntil; index++) {
			elementUtils.getElement('.redirect-icon')[index].setAttribute('id', index);
			eventUtils.addListener('#' + index, 'click', function () {
				localStorage.setItem('name', data[parseInt(event.target.id)].candidateName);
				localStorage.setItem('email', data[parseInt(event.target.id)].email);
				_displayModal(event);
			});
		}
	}
	/**
     * @function _displayModal
     * @description displays the details of the candidate
	 * @param {object} event
     * @returns none
     */
	function _displayModal(event) {
		event.preventDefault();
		componentLoader.clearContent('#modalbody');
		resultTable.result();
		modal.display(resultDetails, showResults);
	}

    /**
     * @function _hideModal
     * @description hides the details of the candidate
	 * @param {object} event
     * @returns none
     */
	function _hideModal(event) {
		event.preventDefault();
		modal.hide(resultDetails, showResults);
		localStorage.removeItem('email');
		localStorage.removeItem('name');
	}
	/**
	 * @function anonymous
	 * @description self invoking function which performs ajax call to _datashow and binds the click event on crossResult to _hidemodal function
	 * @returns none
	 */
	(function () {
		ajax.get('mock/candidate-data.json', _datashow);
		eventUtils.addListener('#crossResult', 'click', _hideModal);
	})();

	return {
		datashow: _datashow
	}
})
