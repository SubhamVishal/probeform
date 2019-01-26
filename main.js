require(['app/common/require-config', 'app/modules/routes.module', 'app/services/router'], function (requireConfig, routesModule, routerService) {
	function reRoute() {
		routerService.router();
		routerService.headerLoader();
		routerService.navBarLoader();
	}
	(function bindEvents() {
		window.addEventListener('hashchange', reRoute);
	})();
});
