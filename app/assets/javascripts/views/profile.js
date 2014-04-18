window.Bridge.Views.Profile = Backbone.CompositeView.extend({
	initialize: function(options){
		this.tags = options.tags;
		this.availableTags = [];
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.tags, "sync", this.createAvailableTags)
		this.openSummaryForm = false;
	},
	
	template: JST["user/profile"],
	
	events: {
		"mouseenter .summary-container": "showEditSummaryButton",
		"mouseleave .summary-container": "hideEditSummaryButton",
		"click #edit-summary": "revealEditSummaryForm",
		"blur #edit-summary-input": "hideEditSummaryForm",
		"mousedown #update-summary": "updateSummary",
		"click #update-summary": "stopQuery"
	},
	
	addPassionView: function(){
    var passionView = new Bridge.Views.Passion({model: this.model, parentView: this})
    this.addSubview("#passion-view-holder", passionView);
    passionView.render();
	},
	
	addPersonalInfoView: function(){
		var personalInfoView = new Bridge.Views.PersonalInfo({model: this.model, parentView: this})
		this.addSubview("#personal-info-holder", personalInfoView)
		personalInfoView.render();
	},
	
	addSkillView: function(){
    var skillView = new Bridge.Views.Skill({model: this.model, parentView: this})
    this.addSubview("#skill-view-holder", skillView);
    skillView.render();
	},
	
	updateSummary: function(){
		var that = this;
		var summary = $("#edit-summary-input").val();
		this.model.save({summary: summary}, {
			success: function(resp){
				that.model.fetch()
			}
		})
	},
	
	hideEditSummaryForm: function(){
		$("#edit-summary-form").addClass("hidden");
		$("#summary-text").removeClass("hidden")
		this.openSummaryForm = false;
	},
	
	revealEditSummaryForm: function(){
		$("#edit-summary-form").removeClass("hidden")
		$("#summary-text").addClass("hidden")
		$("#edit-summary-input").focus();
		this.hideEditSummaryButton();
		this.openSummaryForm = true;
	},
	
	showEditSummaryButton: function(){
		if(!this.openSummaryForm){
			$("#edit-summary").removeClass("hidden")
		}
	},
	
	hideEditSummaryButton: function(){
		$("#edit-summary").addClass("hidden")
	},
	
	createAvailableTags: function(){
		var that = this;
		this.tags.forEach(function(tag){
			that.availableTags.push(tag.escape("name"))
		})
	},	
	
	render: function(){
		var renderedContent = this.template( {user: this.model, skills: this.model.skills()})
		this.$el.html(renderedContent)
		this.addSkillView();
		this.addPassionView();
		this.addPersonalInfoView();
		return this
	},
	
	makeFormSearchable: function(formId){
		var that = this;
		$(formId).autocomplete({
			source: that.availableTags,
			minLength: 2
		})
	},
	
	parseTagName: function(input){
		var tagName = $(input).val();
		tagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);
		return tagName
	}
	
})