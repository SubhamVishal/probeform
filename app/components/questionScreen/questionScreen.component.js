/**
* This file contains the functionality to handle the candidate test screen
* @author Subham Vishal
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
* @returns none
*/
define(['app/services/elementUtils', 'app/services/eventUtils', 'app/services/ajax', 'app/services/modal'], function (elementUtils, eventUtils, ajax, modal) {

    var instruction = elementUtils.getElement('#instruction'),
        candidateScreen = elementUtils.getElement('#questionScreen'),
        thankyou = elementUtils.getElement('#thankyouModal');
    elementUtils.getElement('#header').innerHTML = '';
    elementUtils.getElement('#navBar').innerHTML = '';
    /**
     * @function anonymous
     * @description self invoking function whichdisplays the test instruction pop up
     * @returns none
     */
    (function () {
        modal.display(instruction, candidateScreen);
    })();
    /**
     * @function displayModal - 
     * @description displays the "thank you" pop-up
     * @returns none
     */
    function displayModal() {
        modal.display(thankyou, candidateScreen);
    }
    /**
     * @function hideModal - 
     * @description hides the "test instruction" pop-up
     * @returns none 
     */
    function hideModal() {
        modal.hide(instruction, candidateScreen);
    }
    eventUtils.addListener('#beginTest', 'click', function () {
        hideModal();
        ajax.get('mock/online-test-questions.json', questionShow);
    });

    function questionShow(text, selector) {
        var time = 31,
            count = 0,
            questionCounter = 1,
            totalQuestions = 10,
            txt = JSON.parse(text),
            index = 1,
            section = 1,
            questionLimit = 11,
            htmlRecord = [],
            cssRecord = [],
            jsRecord = [];
        tbody = elementUtils.getElement('#questionPanel');
        temp = elementUtils.getElement("template")[0];
        clon = temp.content.cloneNode(true);
        tbody.appendChild(clon);
        elementUtils.addClass(elementUtils.getElement("#Section1"), "test-active");
        questionIndex = elementUtils.getElement('#questionIndex');
        questionHeading = elementUtils.getElement('#questionText');
        option1 = elementUtils.getElement('#op1');
        option2 = elementUtils.getElement('#op2');
        option3 = elementUtils.getElement('#op3');
        option4 = elementUtils.getElement('#op4');
        option1checkbox = elementUtils.getElement('#option1');
        option2checkbox = elementUtils.getElement('#option2');
        option3checkbox = elementUtils.getElement('#option3');
        option4checkbox = elementUtils.getElement('#option4');
        option1checkbox.checked = false;
        option2checkbox.checked = false;
        option3checkbox.checked = false;
        option4checkbox.checked = false;
        eventUtils.addListener("#testSubmitButton", "click", incrementor);
        eventUtils.addListener("#Section2", "click", cssTestLoader);
        eventUtils.addListener("#Section3", "click", jsTestLoader);
        eventUtils.addListener("#option1", "change", function (event) {
            attemptCounter(event);
        });
        eventUtils.addListener("#option2", "change", function (event) {
            attemptCounter(event);
        });
        eventUtils.addListener("#option3", "change", function (event) {
            attemptCounter(event);
        });
        eventUtils.addListener("#option4", "change", function (event) {
            attemptCounter(event);
        });
        /**
         * @function attemptCounter
         * @description Checks the attempt on the present question and stores the result
         * @param {object} event
         * @returns none 
         */
        function attemptCounter(event) {
            for (var optionNumber = 1; optionNumber < 5; optionNumber++) {
                elementUtils.getElement("#" + "option" + optionNumber).checked = false;
            }
            event.target.checked = true;
            elementUtils.getElement("#" + "custom-check-" + index).checked = event.target.checked;

            if (elementUtils.getElement("#" + "custom-check-" + index).checked) {
                elementUtils.removeClass(elementUtils.getElement("#" + "focus" + index), "test-active");
                elementUtils.addClass(elementUtils.getElement("#" + "focus" + index), "completed");
            }
            else {
                elementUtils.addClass(elementUtils.getElement("#" + "focus" + index), "not-reached");
            }
            if (section === 1) {
                htmlRecord[index - 1] = index + ". " + event.target.id;
            }
            if (section === 2) {
                cssRecord[index - 1] = index + ". " + event.target.id;
            }
            if (section === 3) {
                jsRecord[index - 1] = index + ". " + event.target.id;
            }
        }
        /**
         * @function htmlTestLoader
         * @description switches to html test
         * @returns none
         */
        function htmlTestLoader() {
            section = 1;
            attributeChanger();
        }
        /**
        * @function cssTestLoader
        * @description switches to css test
        * @returns none
        */
        function cssTestLoader() {
            section = 2;
            attributeChanger();
        }
        /**
         * @function jsTestLoader
         * @description switches to js test
         * @returns none
         */
        function jsTestLoader() {
            section = 3;
            attributeChanger();
        }
        /**
         * @function attributeChanger
         * @description changes the focus and color according to the present question and section
         * @returns none
         */
        function attributeChanger() {
            var testObject1 = elementUtils.getElement("#Section1");
            var testObject2 = elementUtils.getElement("#Section2");
            var testObject3 = elementUtils.getElement("#Section3");
            index = 1;
            questionCounter = index;
            time = 31;
            elementUtils.removeClass(elementUtils.getElement("#" + "focus" + index), "test-active");
            elementUtils.removeClass(elementUtils.getElement("#" + "focus" + index), "completed");
            elementUtils.addClass(elementUtils.getElement("#" + "focus" + index), "not-reached");
            option1checkbox.checked = false;
            option2checkbox.checked = false;
            option3checkbox.checked = false;
            option4checkbox.checked = false;


            if (section === 1) {
                elementUtils.addClass(testObject1, "test-active");
                elementUtils.addClass(testObject2, "not-reached");
                elementUtils.addClass(testObject3, "not-reached");
            }
            else if (section === 2) {
                if (elementUtils.checkClass(testObject1, "test-active")) {
                    elementUtils.removeClass(testObject1, "test-active");
                }
                testObject2.removeEventListener("click", cssTestLoader);
                elementUtils.addClass(testObject1, "completed");
                elementUtils.addClass(testObject2, "test-active");
                elementUtils.addClass(testObject3, "next-test");
                for (var k = 1; k < questionLimit; k++) {
                    elementUtils.getElement("#" + "custom-check-" + k).checked = false;
                    elementUtils.addClass(elementUtils.getElement("#" + "focus" + k), "not-reached");
                }
            }
            else if (section === 3) {
                if (elementUtils.checkClass(testObject1, "test-active")) {
                    elementUtils.removeClass(testObject1, "test-active");
                }
                testObject2.removeEventListener("click", cssTestLoader);
                testObject3.removeEventListener("click", jsTestLoader);
                elementUtils.addClass(testObject1, "completed");
                testObject1.removeEventListener("click", htmlTestLoader);
                elementUtils.removeClass(testObject2, "test-active");
                elementUtils.addClass(testObject2, "completed");
                testObject2.removeEventListener("click", cssTestLoader);
                elementUtils.addClass(testObject3, "test-active");
            }
            for (var k = 1; k < questionLimit; k++) {
                elementUtils.getElement("#" + "custom-check-" + k).checked = false;
                elementUtils.addClass(elementUtils.getElement("#" + "focus" + k), "not-reached");
            }
        }
        /**
         * @function incrementor
         * @description Changes the question on the click on next button
         * @returns none
         */
        function incrementor() {
            index = index + 1;
            questionCounter = index;
            time = 31;
            option1checkbox.checked = false;
            option2checkbox.checked = false;
            option3checkbox.checked = false;
            option4checkbox.checked = false;
            if (index < questionLimit) {
                elementUtils.removeClass(elementUtils.getElement("#" + "focus" + index), "test-active");
                elementUtils.removeClass(elementUtils.getElement("#" + "focus" + index), "completed");
                elementUtils.addClass(elementUtils.getElement("#" + "focus" + index), "not-reached");
            }
            if (index === questionLimit) {
                questionCounter = 1;

                section = section + 1;
                attributeChanger();
                if (section === 4) {
                    console.info(htmlRecord);
                    console.info(cssRecord);
                    console.info(jsRecord);
                    displayModal();
                    index = 1;
                    section = 1;
                    elementUtils.addClass(candidateScreen, "hide");
                }
            }
        }
        /**
         * @function anonymous
         * @description base function which loads the question from the database and updates the question screen as per the timer and this function also makes the timer run
         * @returns none
         */
        window.setInterval(function () {
            var focusObject = elementUtils.getElement("#" + "focus" + index);

            if (elementUtils.checkClass(focusObject, "not-reached")) {
                elementUtils.removeClass(focusObject, "not-reached");
            }
            if (!(elementUtils.checkClass(focusObject, "completed"))) {
                elementUtils.addClass(focusObject, "at-present");
            }
            if (index < questionLimit) {
                questionIndex.innerHTML = "Question Number " + questionCounter + " of " + totalQuestions;
                questionHeading.innerHTML = txt[section][index].question;
                option1.innerHTML = txt[section][index].op1;
                option2.innerHTML = txt[section][index].op2;
                option3.innerHTML = txt[section][index].op3;
                option4.innerHTML = txt[section][index].op4;
            }
            time = time - 1;

            updateClock(time);
            if (!time) {
                time = 31;
                index = index + 1
                questionCounter = questionCounter + 1;
                option1checkbox.checked = false;
                option2checkbox.checked = false;
                option3checkbox.checked = false;
                option4checkbox.checked = false;

                if (index === questionLimit) {
                    questionCounter = 1;

                    section = section + 1;
                    attributeChanger();
                    if (section === 4) {
                        console.info(htmlRecord);
                        console.info(cssRecord);
                        console.info(jsRecord);
                        displayModal();
                        index = 1;
                        section = 1;
                        elementUtils.addClass(candidateScreen, "hide");
                    }
                }
            }
        }, 1000);
    }
    /**
     * @function updateClock - 
     * @description shows the timer
     * @param {number} message 
     * @returns none
     */
    function updateClock(message) {
        var clockOne = elementUtils.getElement('#timerSectionOne');
        var clockTwo = elementUtils.getElement('#timerSectionTwo');
        clockOne.innerHTML = message;
        clockTwo.innerHTML = message;
    }


})