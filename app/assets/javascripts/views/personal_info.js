window.Bridge.Views.PersonalInfo = Backbone.View.extend({
	initialize: function(options){
		this.parentView = options.parentView
	},
	
	template: JST["user/personal_info"],
	
	render: function(){
		var renderedContent = this.template({user: this.model})
		this.$el.html(renderedContent)
		return this
	}
	
})