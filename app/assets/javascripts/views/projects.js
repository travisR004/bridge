window.Bridge.Views.Projects = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render)
	},
	
	template: JST["user/projects"],
	
	render: function(){
		var renderedContent = this.template({projects: this.collection});
		this.$el.html(renderedContent)
		return this
	},
	
	events: {
		"click .project-holder": "goToProjectPage"
	},
	
	goToProjectPage: function(event){
		var data = $(event.target).data("id")
		Backbone.history.navigate("projects/" + data, {trigger: true})
	}
	
})