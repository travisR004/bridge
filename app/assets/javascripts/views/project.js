window.Bridge.Views.Project = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, "sync", this.render)
	},
	
	template: JST["user/project"],
	
	render: function(){
		debugger
		var renderedContent = this.template({project: this.model})
		this.$el.html(renderedContent)
		return this
	}
})