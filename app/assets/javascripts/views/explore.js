window.Bridge.Views.Explore = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render)
	},
	
	template: JST["user/explore"],
	
	render: function(){
		var renderedContent = this.template({projects: this.collection});
		this.$el.html(renderedContent)
		return this
	}
})