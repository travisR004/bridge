window.Bridge.Views.Profile = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, "all", this.render)
	},
	
	template: JST["user/profile"],
	
	render: function(){
		var renderedContent = this.template( {user: this.model})
		this.$el.html(renderedContent)
		return this
	}
	
})