window.Bridge.Views.CreatePage = Backbone.View.extend({
	template: JST["user/create"],
	
	render: function(){
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
})