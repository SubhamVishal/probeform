/**
 * Functionality of candidate listing page
 * @author Pranik Sidana and Akshita Garg
 */
/**
 * define function()
 * The specification defines a single function "define" that is available as a free variable or a global variable. 
 * Dependencies - ajax, elementUtils, eventUtils, modal
 * Dependencies is an array literal of the module ids that are dependencies required by the module that is being defined.
 * factory function()
 * Factory is a function that should be executed to instantiate the module or an object.
 * @param {object} ajax
 * @param {object} elementUtils
 * @param {object} eventUtils
 * @param {object} modal
 * @returns none
 */
define(['app/services/ajax', 'app/services/elementUtils', 'app/services/eventUtils', 'app/services/modal'], function (ajax, elementUtils, eventUtils, modal) {
    var reminder,
        assignInterviewer = elementUtils.getElement('#assignInterviewer'),
        candidateList = elementUtils.getElement('#candidateList');

    /**
     * @function datashow
     * @description the function shows data of each candidate
     * @param {string} fileData 
     * @param {string} selector
     * @returns none 
     */
    function _datashow(fileData, selector) {
        var data, clone, assign, dataLength;
        data = JSON.parse(fileData);
        dataLength = data.length;
        for (var index = 0; index < dataLength; index++) {
            clone = elementUtils.getElement("template")[0].content.cloneNode(true);
            elementUtils.getElement('#tbody').appendChild(clone);
            elementUtils.getElement('.js-image-show')[index].setAttribute("src", data[index].imgurl);;
            elementUtils.getElement('.js-p-name')[index].innerHTML = data[index].candidateName;
            elementUtils.getElement('.js-p-oid')[index].innerHTML = data[index].oracleId;
            elementUtils.getElement('.js-p-email')[index].innerHTML = data[index].email;
            elementUtils.getElement('.js-p-date')[index].innerHTML = data[index].Date;
            elementUtils.getElement('.js-p-test')[index].innerHTML = data[index].Test;
            assign = elementUtils.getElement('input')[2 * index];
            if (!data[index].interviewer) {
                assign.setAttribute("value", "Assigned");
                assign.disabled = true;
                elementUtils.removeClass(assign, "js-assign");
            }
            else {
                eventUtils.addListener('.js-assign', 'click', _displayModal);
            }
            reminder = elementUtils.getElement('input')[2 * index + 1];
            if (!data[index].Reminder) {
                reminder.setAttribute("value", "sent");
                reminder.disabled = true;
            }
            else {
                reminder.addEventListener('click', function () {
                    window.open(
                        '#candidateScreen',
                        '_blank'
                    );
                });
            }
        }
    };

    /**
     * @function _displayModal
     * @description displays the details of the candidate
     * @returns none
     */
    function _displayModal(event) {
        event.preventDefault();
        reminder.disabled = true;
        modal.display(assignInterviewer, candidateList);
    }

    /**
     * @function _hideModal
     * @description hides the details of the candidate
     * @returns none
     */
    function _hideModal(event) {
        event.preventDefault();
        reminder.disabled = false;
        modal.hide(assignInterviewer, candidateList);
    }

    /**
     * @function interviewer
     * @description populates the interviewer list in the dropdown
     * @param {string} text 
     * @param {string} selector 
     */
    function _interviewer(fileData, selector) {
        var data, dataLength, clone;
        data = JSON.parse(fileData);
        dataLength = data.length;
        for (var index = 0; index < dataLength; index++) {
            clone = elementUtils.getElement("template")[1].content.cloneNode(true);
            elementUtils.getElement('#selectBody').appendChild(clone);
            elementUtils.getElement('.js-interviewer')[index].innerHTML = data[index];
        }
    };

    /**
     * @function anonymous
     * @description Self invoking function which makes the ajax call
     * @returns none
     */
    (function () {
        ajax.get('mock/candidate-data.json', _datashow);
        ajax.get('mock/interviewer.json', _interviewer);
        eventUtils.addListener('#cross', 'click', _hideModal);
        eventUtils.addListener('#cancel', 'click', _hideModal);
        eventUtils.addListener('#assign', 'click', _hideModal);
    })();
})