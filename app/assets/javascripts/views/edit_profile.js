window.Bridge.Views.editProfile = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, "all", this.render)
	},
	
	template: JST["user/edit_profile"],
	
	events: {
		"submit #edit-profile": "updateProfile"
	},
	
	render: function(){
		var renderedContent = this.template({user: this.model})
		this.$el.html(renderedContent)
		return this
	},
	
	updateProfile: function(event){
		event.preventDefault();
		var data = $(event.target).serializeJSON();
		debugger
		this.model.save(data)
	}
})