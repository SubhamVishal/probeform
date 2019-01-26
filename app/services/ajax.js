/**
 * To make an ajax call to a file in order to load the data
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
 * @returns {function} get
 * @returns {function} post
 */
define(['services/elementUtils'], function (elementUtils) {
    /**
     * @function _callAjax 
     * @description performs the ajax call
     * @param {string} url 
     * @param {string} method 
     * @param {object} callback 
     * @param {string} params
     * @returns none
     */
    function _callAjax(url, method, callback, params) {
        var xhr = _initAjax();
        if (xhr) {
            xhr.open(method, url, true);
            xhr.onreadystatechange = function (event) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        callback && callback(xhr.responseText, params);
                    }
                    else if (xhr.status >= 400) {
                        _handleError(event);
                    }
                }
            };
            xhr.send(params || {});
        }
    }
    /**
     * @function _initAjax 
     * @description creates a new object of XMLHttpRequest and ensures cross browser compatibility
     * @returns {object} xhr
     */
    function _initAjax() {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                try {
                    xhr = new ActiveXObject("MSXML2.XMLHTTP.4.0");
                } catch (e) {
                    xhr = false;
                }
            }
        }
        return xhr;
    }
    /**
     * @function _handleError
     * @description handles error in any situation
     * @param {object} e 
     * @returns none
     */

    function _handleError(e) {
        console.error("Error " + e.target.status + " occurred while receiving the document.");
    }
    /**
     * @function get
     * @description method parameter for _callAjax function
     * @param {string} url 
     * @param {string} callback 
     * @param {string} params
     * @returns none 
     */

    function get(url, callback, params) {
        _callAjax(url, 'GET', callback, params);
    }
    /**
     * @function post
     * @description method parameter for _callAjax function
     * @param {string} url 
     * @param {string} callback 
     * @param {string} params
     * @returns none 
     */

    function post(url, callback, params) {
        _callAjax(url, 'POST', callback, params);
    }

    return {
        get: get,
        post: post
    };
});
