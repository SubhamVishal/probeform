/**
 * Functionality of modify test page
 * @author Pranik Sidana and Akshita Garg
 */
/**
 * define function()
 * The specification defines a single function "define" that is available as a free variable or a global variable. 
 * Dependencies - eventUtils, elementUtils, ajax , modal
 * Dependencies is an array literal of the module ids that are dependencies required by the module that is being defined.
 * factory function()
 * Factory is a function that should be executed to instantiate the module or an object.
 * @param {object} eventUtils
 * @param {object} elementUtils
 * @param {object} ajax
 * @param {object} modal
 * @returns none
 */
define(['app/services/eventUtils', 'app/services/elementUtils', 'app/services/ajax', 'app/services/modal'], function (eventUtils, elementUtils, ajax, modal) {
    var questionNumber,
        data,
        addQuestions = elementUtils.getElement('#addQuestions'),
        modifyTest = elementUtils.getElement('#modifyTest'),
        deleteQuestions = elementUtils.getElement('#deleteQuestions'),
        modifyForm = elementUtils.getElement('#modifyForm'),
        addNew = elementUtils.getElement('#addNew'),
        deleteQues = elementUtils.getElement('#delete'),
        saveDetail = elementUtils.getElement('#saveDetail'),
        select = elementUtils.getElement("#test"),
        ques = elementUtils.getElement('#question'),
        correctAnswer = elementUtils.getElement('#correctAnswer'),
        wrongAnswer = elementUtils.getElement('#wrongAnswer'),
        wrongAnswer1 = elementUtils.getElement('#wrongAnswer1'),
        wrongAnswer2 = elementUtils.getElement('#wrongAnswer2'),
        formLength = modifyForm.length;
    /**
     * @function showData
     * @description this function displays a question
     * @param {number} questionNumber
     * @returns none 
     */
    function _showData(questionNumber) {
        ques.value = data[select.value][questionNumber].question;
        ques.readOnly = true;
        correctAnswer.value = data[select.value][questionNumber].option1;
        correctAnswer.readOnly = true;
        wrongAnswer.value = data[select.value][questionNumber].option2;
        wrongAnswer.readOnly = true;
        wrongAnswer1.value = data[select.value][questionNumber].option3;
        wrongAnswer1.readOnly = true;
        wrongAnswer2.value = data[select.value][questionNumber].option4;
        wrongAnswer2.readOnly = true;
    }

    /**
     * @inner
     * @function _displayQues
     * @description this function prepares the list of questions
     * @param {string} fileData
     * @param {string} selector
     * @returns none
     */
    function _displayQues(fileData, selector) {
        questionNumber = questionNumber || 0,
            data = JSON.parse(fileData);
        eventUtils.addListener('#js-1', 'click', function () {
            _showData(0, data);
        });
        eventUtils.addListener('#js-2', 'click', function () {
            _showData(1, data);
        });
        eventUtils.addListener('#js-3', 'click', function () {
            _showData(2, data);
        });
        eventUtils.addListener('#js-4', 'click', function () {
            _showData(3, data);
        });
        eventUtils.addListener('#js-5', 'click', function () {
            _showData(4, data);
        });
        eventUtils.addListener('#ques', 'click', function () {
            ques.readOnly = false;
        })
        eventUtils.addListener('#correct', 'click', function () {
            correctAnswer.readOnly = false;
        })
        eventUtils.addListener('#wrong', 'click', function () {
            wrongAnswer.readOnly = false;
        })
        eventUtils.addListener('#wrong1', 'click', function () {
            wrongAnswer1.readOnly = false;
        })
        eventUtils.addListener('#wrong2', 'click', function () {
            wrongAnswer2.readOnly = false;
        })
        _showData(0);
    }

    /**
     * @function _onTestSelect
     * @description this function displays the questions for a particular test
     * @returns none  
     */
    function _onTestSelect() {
        ajax.get('mock/question-data.json', _displayQues);
    }

    /**
     * @function _displayAdd
     * @description displays the modal of add questions
     * @param {object} event
     * @returns none 
     */
    function _displayAdd(event) {
        event.preventDefault();
        _disableForm();
        modal.display(addQuestions, modifyTest);
    }

    /**
     * @function _hideAdd
     * @description hides the modal of add questions
     * @param {object} event
     * @returns none 
     */
    function _hideAdd(event) {
        event.preventDefault();
        _enableForm();
        modal.hide(addQuestions, modifyTest);
    }

    /**
     * @function _displayDelete
     * @description displays the modal of delete questions
     * @param {object} event 
     * @returns none
     */
    function _displayDelete(event) {
        event.preventDefault();
        _disableForm();
        modal.display(deleteQuestions, modifyTest);
    }

    /**
     * @function _hideDelete
     * @description hides the modal of delete questions
     * @param {object} event
     * @returns none 
     */
    function _hideDelete(event) {
        event.preventDefault();
        _enableForm();
        modal.hide(deleteQuestions, modifyTest);
    }

    /**
     * @function _disableForm
     * @description disables the input fields and buttons in the background
     * @param {object} event
     * @returns none 
     */
    function _disableForm(event) {
        for (var index = 0; index < formLength; index++) {
            modifyForm[index].disabled = true;
        }
        addNew.disabled = true;
        deleteQues.disabled = true;
        saveDetail.disabled = true;
    }

    /**
     * @function _enableForm
     * @description enables the input fields and buttons in the background
     * @param {object} event 
     * @returns none
     */
    function _enableForm(event) {
        for (var index = 0; index < formLength; index++) {
            modifyForm[index].disabled = false;
        }
        addNew.disabled = false;
        deleteQues.disabled = false;
        saveDetail.disabled = false;
    }

    /**
     * @function anonymous
     * @description self invoking function which binds the event click on test change dropdown
     * @returns none
     */
    (function () {
        eventUtils.addListener('#addNew', 'click', _displayAdd);
        eventUtils.addListener('#cancelAdd', 'click', _hideAdd);
        eventUtils.addListener('#crossAdd', 'click', _hideAdd);
        eventUtils.addListener('#add', 'click', _hideAdd);
        eventUtils.addListener('#delete', 'click', _displayDelete);
        eventUtils.addListener('#crossDelete', 'click', _hideDelete);
        eventUtils.addListener('#noDelete', 'click', _hideDelete);
        eventUtils.addListener('#yesDelete', 'click', _hideDelete);
        eventUtils.addListener('#test', 'change', _onTestSelect);

        /**
         * @function anonymous
         * @description self invoking function which binds the event click on save detail button
         * @returns none
         */
        eventUtils.addListener('#saveDetail', 'click', function (event) {
            event.preventDefault();
            modifyForm.reset();
            window.location.href = '#modifyTest';
        });
    })();
})


