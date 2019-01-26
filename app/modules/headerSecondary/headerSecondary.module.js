define(['app/services/eventUtils', 'app/services/router', 'app/services/elementUtils'], function (eventUtils, routerService, elementUtils) {
    function logout(e) {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        window.location.href = '#loginForm';
        window.location.reload();
    }
    function render() {
        eventUtils.addListener('#logout', 'click', logout);
        var userName = elementUtils.getElement('#headerUsername');
        userName.innerHTML = sessionStorage.getItem('username').toUpperCase();
    };
    return {
        render: render
    }
})