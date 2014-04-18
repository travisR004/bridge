window.Bridge.Views.Skill = Backbone.View.extend({
	initialize: function(options){
		this.parentView = options.parentView
		this.openSkillForm = false;
	},
	
	template: JST["user/skill"],
	
	render: function(){
		var renderedContent = this.template({skills: this.model.skills()});
		this.$el.html(renderedContent)
		return this
	},
	
	events: {
		"click #add-skill": "revealAddSkillForm",
		"blur #add-skill-form": "hideAddSkillForm",
		"mouseenter #skill-holder": "showAddSkillButton",
		"mouseleave #skill-holder": "hideAddSkillButton",
		"mousedown #submit-skill": "addSkill",
		"click #submit-skill": "stopQuery",
	},
	
	addSkill: function(event){
		var that = this;
		var tagName = this.parentView.parseTagName("#add-skill-input")
		var tagModel = new Bridge.Models.Tag();
		tagModel.save({name: tagName}, {
			success: function(resp){
				var newSkill = new Bridge.Models.SkillJoin();
				newSkill.save({skill_join: {tag_id: resp.id}});
				that.parentView.tags.fetch();
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
	
	hideAddSkillButton: function(){
		$("#add-skill").addClass("hidden")
	},
	
	hideAddSkillForm: function(event){
		$("#add-skill-form").addClass("hidden")
		this.openSkillForm = false;
	},
	
	revealAddSkillForm: function(event){
		this.parentView.makeFormSearchable("#add-skill-input");
		$("#add-skill-form").removeClass("hidden");
		$("#add-skill-input").focus();
		this.hideAddSkillButton();
		this.openSkillForm = true;
	},
	
	showAddSkillButton: function(){
		if(!this.openSkillForm){
			$("#add-skill").removeClass("hidden")
		}
	},
	
	stopQuery: function(event){
		event.preventDefault();
	}
})