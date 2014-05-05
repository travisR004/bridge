window.Bridge.Views.Summary = Backbone.View.extend({
	initialize: function(options){
		this.parentView = options.parentView;
	},
	
	template: JST["user/summary"],
	
	render: function(){
		var renderedContent = this.template({user: this.model})
		this.$el.html(renderedContent)
		return this
	},
	
	events: {
		"click #edit-summary": "revealEditSummaryForm",
		"blur #edit-summary-input": "hideEditSummaryForm",
		"mousedown #update-summary": "updateSummary",
		"click #update-summary": "stopQuery"
	},
	
	updateSummary: function(){
		var that = this;
		console.log("mouse-downed")
		var summary = $("#edit-summary-input").val();
		this.model.save({summary: summary}, {
			success: function(resp){
				that.model.fetch()
			}
		})
	},
	
	hideEditSummaryForm: function(){
		$("#edit-summary-form").addClass("hidden");
		$("#summary-text").removeClass("hidden");
		this.showEditSummaryButton();
	},
	
	revealEditSummaryForm: function(){
		$("#edit-summary-form").removeClass("hidden")
		$("#summary-text").addClass("hidden")
		$("#edit-summary-input").focus();
		this.hideEditSummaryButton();
	},
	
	showEditSummaryButton: function(){
		$("#edit-summary").removeClass("hidden")
	},
	
	hideEditSummaryButton: function(){
		$("#edit-summary").addClass("hidden")
	},
})