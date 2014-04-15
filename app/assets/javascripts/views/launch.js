window.Bridge.Views.Launch = Backbone.View.extend({
	template: JST["root/landing"],
	
	render: function(){
		var renderedContent = this.template()
		this.$el.html(renderedContent)
		return this
	},
	
	events: {
		"submit #sign-in": "signIn",
		"submit #sign-up": "signOut"
	}
})