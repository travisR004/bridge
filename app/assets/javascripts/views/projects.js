window.Bridge.Views.Projects = Backbone.View.extend({
	template: JST["user/projects"],
	
	render: function(){
		var renderedContent = this.template({projects: this.collection});
		this.$el.html(renderedContent)
		return this
	}
	
})