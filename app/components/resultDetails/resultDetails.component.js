/**
 * Functionality of result details page
 * @author Pranik Sidana
 */
/**
 * define function()
 * The specification defines a single function "define" that is available as a free variable or a global variable. 
 * Dependencies - elementUtils, eventUtils, ajax, modal
 * Dependencies is an array literal of the module ids that are dependencies required by the module that is being defined.
 * factory function()
 * Factory is a function that should be executed to instantiate the module or an object.
 * @param {object} elementUtils
 * @param {object} eventUtils
 * @param {object} ajax
 * @param {object} modal
 * @returns {function} loadResult
 */
define(['app/services/elementUtils', 'app/services/eventUtils', 'app/services/ajax', 'app/services/modal'], function (elementUtils, eventUtils, ajax, modal) {
    var answerKey;
    /**
     * @function _questionShow
     * @description displays the question
     * @param {object} fileData 
     * @param {string} selector
     * @returns none 
     */
    function _questionShow(fileData, selector) {
        var correct = 0,
            incorrect = 0,
            data,
            clone,
            questionIndex,
            answerIndex,
            length,
            index,
            objectLength,
            quesLoopUntil,
            data = JSON.parse(fileData),
            mail = window.localStorage.getItem('email'),
            name = window.localStorage.getItem('name'),
            loopUntil = Object.keys(data).length;
        answerKey = JSON.parse(answerKey);
        for (index = 0; index < loopUntil; index++) {
            if (data[index][mail]) {
                length = Object.keys(data[index][mail]).length / 2;
                for (questionIndex = 0; questionIndex < length; questionIndex++) {
                    clone = document.getElementsByTagName("template")[1].content.cloneNode(true);
                    elementUtils.getElement('#modalbody').appendChild(clone);
                }
                break;
            }
        }
        objectLength = Object.keys(answerKey).length;
        for (answerIndex = 0; answerIndex < objectLength; answerIndex++) {
            if (answerKey[answerIndex][mail]) {
                break;
            }
        }
        quesLoopUntil = Object.keys(data[index][mail]).length / 2;
        for (questionIndex = 0; questionIndex < quesLoopUntil; questionIndex++) {
            elementUtils.getElement('.js-serialno')[questionIndex].innerHTML = questionIndex + 1;
            elementUtils.getElement('.js-ques')[questionIndex].innerHTML = data[answerIndex][mail]['q' + (questionIndex + 1)];
            if (!data[answerIndex][mail][questionIndex + 1]) {
                elementUtils.getElement('input')[questionIndex + 2].checked = false;
            }
            else if (answerKey[answerIndex][mail][questionIndex] === data[index][mail][questionIndex + 1])
                correct++;
            else
                incorrect++;
        }
        elementUtils.getElement('#total-score').innerHTML = correct;
        elementUtils.getElement('#final-score').innerHTML = correct;
        elementUtils.getElement('#incorrect-score').innerHTML = incorrect;
        elementUtils.getElement('#attempted').innerHTML = correct + incorrect;
        elementUtils.getElement('.js-name')[0].innerHTML = name;

    };
    /**
     * @function _getAnswerKey
     * @description loads the answer key from JSON file
     * @param {string} answer 
     * @param {string} selector
     * @returns none 
     */
    function _getAnswerKey(answer, selector) {
        answerKey = answer;
        ajax.get('mock/candidate-response.json', _questionShow);
    };
    /**
     * @function loadResult
     * @description makes the ajax call to the JSON file containing recorded responses from the candidate
     * @returns none
     */
    function loadResult() {
        ajax.get('mock/answer-key.json', _getAnswerKey);
    };
    return {
        result: loadResult
    };
});

