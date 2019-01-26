define(['app/services/component'],function (component) {
	return {
		render: function(){
			component && component.render && component.render();
		}
	}
});