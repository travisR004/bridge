window.Bridge.Views.PersonalInfo = Backbone.View.extend({
	initialize: function(options){
		this.parentView = options.parentView
	},
	
	template: JST["user/personal_info"],
	
	render: function(){
		var renderedContent = this.template({user: this.model})
		this.$el.html(renderedContent)
		return this
	},
	
	events: {
		"click #edit-info": "revealEditInfoForm",
		"blur #personal-info-form": "hideEditInfoForm",
		"mousedown #update-info": "updateInfo",
		"click #update-info": "stopQuery"
	},
	
	revealEditInfoForm: function(event){
		event.preventDefault();
		$("#personal-info").toggleClass("hidden");
		$("#personal-info-form").toggleClass("hidden");
		$("#personal-info-focus").focus()
	},
	
	hideEditInfoButton: function(){
		$("#edit-info").addClass("hidden")
	},
	
	hideEditInfoForm: function(){
		$("#personal-info-form").toggleClass("hidden");
		$("#personal-info").toggleClass("hidden")
	},
	
	showEditInfoButton: function(){
		$("#edit-info").removeClass("hidden")
	},
	
	stopQuery: function(event){
		event.preventDefault();
	},
	
	updateInfo: function(event){
		event.preventDefault();
		var data = $(event.currentTarget).parent().serializeJSON();
		this.model.save(data);
	}
	
})