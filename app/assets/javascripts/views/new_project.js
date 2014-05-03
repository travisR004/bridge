window.Bridge.Views.NewProject = Backbone.View.extend({
	template: JST["user/new_project"],
	
	render: function(){
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},
	
	events: {
		"click #add-image": "openFilePicker"
	},
	
	openFilePicker: function(event){
		event.preventDefault();
		$("#file-picker").click()
	}
	
})