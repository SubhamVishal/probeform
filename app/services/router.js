/**
 * Utility for displaying a modal
 * @author Akshita Garg and Poonam Bansal
 */
/**
 * define function()
 * The specification defines a single function "define" that is available as a free variable or a global variable. 
 * Dependencies - ajax, componentLoader
 * Dependencies is an array literal of the module ids that are dependencies required by the module that is being defined.
 * factory function()
 * Factory is a function that should be executed to instantiate the module or an object.
 * @param {object} ajax
 * @param {object} componentLoader
 * @returns {function} registerRoutes
 * @returns {function} router
 * @returns {function} footerLoader
 * @returns {function} headerLoader
 * @returns {function} navBarLoader
 */
define(['app/services/ajax', 'app/services/componentLoader'], function (ajax, componentLoader) {
	var mainRouteContainer = '',
		headerContainer,
		footerContainer,
		navBarContainer,
		head = '',
		link = '',
		roleFlag = 0,
		routes = {};
	/**
	 * @function route
	 * @description sets the route attribute
	 * @param {object} route
	 * @returns none 
	 */
	function Route(route) {
		this.route = route;
	}

	/**
	 * @function anonymous
	 * @description performs an ajax call
	 * @returns none 
	 */
	Route.prototype.loadCurrentRoute = function (element) {
		var _self = this;
		ajax.get(_self.route.template, function (responseText) {
			element.innerHTML = responseText;
			require([_self.route.js], function (module) {
				module && module.render && module.render();
			})
			if (_self.route.css) {
				var css = document.createElement("link");
				css.href = _self.route.css;
				css.rel = "stylesheet";
				head.appendChild(css);
			}
		});
	}
	/**
	 * @function footerLoader
	 * @description loads the footer
	 * @returns none
	 */
	function footerLoader() {
		var route = routes['footer'];
		route && footerContainer && route.loadCurrentRoute(footerContainer);
	}
	/**
	 * @function headerLoader
	 * @description loads the header
	 * @returns none
	 */
	function headerLoader() {
		var route;
		if (sessionStorage.getItem("username")) {
			route = routes['headerSecondary'];
		} else {
			route = routes['headerPrimary'];
		}
		route && headerContainer && route.loadCurrentRoute(headerContainer);
	}
	/**
	 * @function navBarLoader
	 * @description loads the navBar
	 * @returns none
	 */
	function navBarLoader() {
		var role = sessionStorage.getItem('role');
		if (role && role === 'interviewer') {
			roleFlag = 1;
		}
		else if (role && role === 'hr') {
			roleFlag = 2;
		}
		else {
			roleFlag = 0;
		}
		var route;
		if (roleFlag === 1) {
			route = routes['navBarPrimary'];
		} else if (roleFlag === 2) {
			route = routes['navBarSecondary'];
		}
		else {
			componentLoader.clearContent('#navBar');
		}
		route && navBarContainer && route.loadCurrentRoute(navBarContainer);
	}
	/**
	 * @function router
	 * @description sets the route
	 * @returns none 
	 */
	function router() {
		var route = routes[window.location.hash.slice(1)];
		if (route) {
			mainRouteContainer && route.loadCurrentRoute(mainRouteContainer);
		} else {
			window.location.hash = '#loginForm';
		}
	}
	/**
	 * @function registerRoutes
	 * @description registers the route
	 * @param {object} routeList
	 * @returns none 
	 */
	function registerRoutes(routeList) {
		var route, length = routeList.length;
		for (var index = 0; index < length; index++) {
			route = routeList[index];
			routes[route.path] = new Route(route);
		}
		footerContainer = document.getElementsByTagName('footer');
		footerContainer = footerContainer && footerContainer[0];

		headerContainer = document.getElementsByTagName('header');
		headerContainer = headerContainer && headerContainer[0];

		navBarContainer = document.getElementsByTagName('div');
		navBarContainer = navBarContainer && navBarContainer[0];

		mainRouteContainer = document.getElementsByTagName('main');
		mainRouteContainer = mainRouteContainer && mainRouteContainer[0];
		head = document.getElementsByTagName('head');
		head = head && head[0];
		link = document.getElementsByTagName("link");

	}

	return {
		registerRoutes: registerRoutes,
		router: router,
		footerLoader: footerLoader,
		headerLoader: headerLoader,
		navBarLoader: navBarLoader,
	}
})