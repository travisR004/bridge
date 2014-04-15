window.Bridge.Views.Profile = Backbone.View.extend({
	initialize: function(options){
		this.tags = options.tags;
		this.availableTags = [];
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.tags, "sync", this.createAvailableTags)
		this.openSkillForm = false;
		this.openPassionForm = false;
		this.openSummaryForm = false;
	},
	
	template: JST["user/profile"],
	
	events: {
		"click #add-skill": "revealAddSkillForm",
		"blur #add-skill-form": "hideAddSkillForm",
		"mouseenter #skill-holder": "showAddSkillButton",
		"mouseleave #skill-holder": "hideAddSkillButton",
		"mousedown #submit-skill": "addSkill",
		"click #submit-skill": "stopQuery",
		"click #add-passion": "revealAddPassionForm",
		"blur #add-passion-form": "hideAddPassionForm",
		"mouseenter #passion-holder": "showAddPassionButton",
		"mouseleave #passion-holder": "hideAddPassionButton",
		"mousedown #submit-passion": "addPassion",
		"click #submit-passion": "stopQuery",
		"mouseenter .summary-container": "showEditSummaryButton",
		"mouseleave .summary-container": "hideEditSummaryButton",
		"click #edit-summary": "revealEditSummaryForm",
		"blur #edit-summary-input": "hideEditSummaryForm",
		"mousedown #update-summary": "updateSummary",
		"click #update-summary": "stopQuery"
	},
	
	addPassion: function(event){
		var that = this;
		var tagName = this.parseTagName("#add-passion-input")
		var tagModel = new Bridge.Models.Tag();
		tagModel.save({name: tagName}, {
			success: function(resp){
				var newPassion = new Bridge.Models.PassionJoin();
				newPassion.save({passion_join: {tag_id: resp.id}});
				that.tags.fetch()
				that.model.fetch()
			},
			error: function(model, resp){
				if(resp.responseJSON){
					var newPassion = new Bridge.Models.PassionJoin()
					newPassion.save({passion_join: {tag_id: resp.responseJSON.id}})
					that.model.fetch()
				} else {
					$("#passion-errors").html("Sorry, please keep skills to under 20 characters")
				}
			}
		})
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
		debugger
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
	
	addSkill: function(event){
		var that = this;
		var tagName = this.parseTagName("#add-skill-input")
		var tagModel = new Bridge.Models.Tag();
		tagModel.save({name: tagName}, {
			success: function(resp){
				var newSkill = new Bridge.Models.SkillJoin();
				newSkill.save({skill_join: {tag_id: resp.id}});
				that.tags.fetch();
				that.model.fetch();
			},
			error: function(model, resp){
				if(resp.responseJSON){
					var newSkill = new Bridge.Models.SkillJoin();
					newSkill.save({skill_join: {tag_id: resp.responseJSON.id}});
					that.model.fetch();
				} else {
					$("#skill-errors").html("Sorry, please keep skills to under 20 characters")
				}
			}
		})
	},
	
	createAvailableTags: function(){
		var that = this;
		this.tags.forEach(function(tag){
			that.availableTags.push(tag.escape("name"))
		})
	},	
	
	render: function(){
		var renderedContent = this.template( {user: this.model, skills: this.model.skills(), passions: this.model.passions()})
		this.$el.html(renderedContent)
		return this
	},
	
	showAddPassionButton: function(){
		if(!this.openPassionForm){
			$("#add-passion").removeClass("hidden")
		}
	},
	
	showAddSkillButton: function(){
		if(!this.openSkillForm){
			$("#add-skill").removeClass("hidden")
		}
	},
	
	hideAddPassionButton: function(){
		$("#add-passion").addClass("hidden")
	},
	
	hideAddSkillButton: function(){
		$("#add-skill").addClass("hidden")
	},
	
	revealAddPassionForm: function(event){
		this.makeFormSearchable("#add-passion-input");
		$("#add-passion-form").removeClass("hidden")
		$("#add-passion-input").focus();
		this.hideAddPassionButton();
		this.openPassionForm = true;
	},
	
	revealAddSkillForm: function(event){
		this.makeFormSearchable("#add-skill-input");
		$("#add-skill-form").removeClass("hidden");
		$("#add-skill-input").focus();
		this.hideAddSkillButton();
		this.openSkillForm = true;
	},
	
	hideAddPassionForm: function(){
		$("#add-passion-form").addClass("hidden");
		this.openPassionForm = false;
	},
	
	hideAddSkillForm: function(event){
		$("#add-skill-form").addClass("hidden")
		this.openSkillForm = false;
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
	},
	
	stopQuery: function(event){
		event.preventDefault()
	}
	
})