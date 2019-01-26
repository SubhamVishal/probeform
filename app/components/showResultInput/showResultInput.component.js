/**
 * Functionality of show result page
 * @author Pranik Sidana
 */
/**
 * define function()
 * The specification defines a single function "define" that is available as a free variable or a global variable. 
 * Dependencies - , eventUtils,elementUtils, ajax, showResultTable
 * Dependencies is an array literal of the module ids that are dependencies required by the module that is being defined.
 * factory function()
 * Factory is a function that should be executed to instantiate the module or an object.
 * @param {object} eventUtils
 * @param {object} elementUtils
 * @param {object} ajax
 * @param {object} showResultTable
 * @returns {function} none
 */
define(['app/services/eventUtils', 'app/services/elementUtils', 'app/services/ajax', 'app/components/showResultTable/showResultTable.component'], function (eventUtils, elementUtils, ajax, showResultTable) {
    /**
     * @function filter
     * @description loads data from candidate JSON file
     * @returns none
     */
    function filter() {
        ajax.get('mock/candidate-data.json', check);
    }
    /**
     * @function check
     * @description checks the data loaded from JSON file
     * @param {object} fileData 
     * @param {string} selector
     * @returns none
     */
    function check(fileData, selector) {
        var name = elementUtils.getElement('#js-search').value,
            stage = elementUtils.getElement('#stage').value,
            date = elementUtils.getElement('#date').value,
            allData = [],
            data = JSON.parse(fileData),
            dataLength = data.length,
            clearData;
        for (var index = 0; index < dataLength; index++) {
            if (data[index].candidateName.includes(name)) {
                allData.push(data[index]);
            }
        }
        data = allData;
        allData = [];
        dataLength = data.length;
        if (stage) {
            for (var index = 0; index < dataLength; index++) {
                if (data[index].stage === stage) {
                    allData.push(data[index]);
                }
            }
            data = allData; 
            allData = [];
            dataLength = data.length;
        }
        if (date) {
            for (var index = 0; index < dataLength; index++) {
                if (data[index].Date === date) {
                    allData.push(data[index]);
                }
            }
            data = allData;
            allData = [];
        }
        clearData = elementUtils.getElement('#tbody');
        clearData.innerHTML = "";
        showResultTable.datashow(JSON.stringify(data), selector);
    }
    /**
     * @function anonymous
     * @description self invoking function which calls the filter function when submit button is clicked
     * @returns none
     */
    (function () {
        eventUtils.addListener('#submit', 'click', filter);
    })();
})