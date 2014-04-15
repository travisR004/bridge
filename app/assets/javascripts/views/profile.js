window.Bridge.Views.Profile = Backbone.View.extend({
	initialize: function(options){
		this.listenTo(this.model, "all", this.render);
		this.tags = options.tags;
		this.skillFlag = true;
	},
	
	template: JST["user/profile"],
	
	events: {
		"click #add-skill": "revealAddSkillForm",
		"blur #add-skill-form": "hideAddSkillForm",
		"mouseenter #skill-holder": "showAddButton",
		"mouseleave #skill-holder": "hideAddButton"
	},
	
	render: function(){
		var renderedContent = this.template( {user: this.model, skills: this.model.skills(), passions: this.model.passions()})
		this.$el.html(renderedContent)
		return this
	},
	
	showAddButton: function(){
		if(this.skillFlag){
			$("#add-skill").removeClass("hidden")			
		}
		this.skillFlag = false;
	},
	
	hideAddButton: function(){
		if(!this.skillFlag){
			$("#add-skill").addClass("hidden")	
		}
		
	},
	
	revealAddSkillForm: function(event){
		event.preventDefault();
		$("#add-skill-form").removeClass("hidden");
		$("#add-skill-form").focus();
		if(!this.skillFlag){
			$("#add-skill").addClass("hidden");
		}
	},
	
	hideAddSkillForm: function(event){
		event.preventDefault();
		$("#add-skill-form").addClass("hidden")
		if(this.skillFlag){
			$("add-skill").removeClass("hidden")
		}
	}
	
	
	addPassion: function(event){
		event.preventDefault();
		event.stopPropagation();
		var that = this;
		var tagName = $("#tags").val();
		tagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);
		$(".edit-tags").append(tagName);
		var tagModel = new Bridge.Models.Tag();
		tagModel.save({name: tagName}, {
			success: function(resp){
				that.tagIds.push(resp.id)
				that.tags.fetch()
			},
			error: function(model, resp){
				that.tagIds.push(resp.responseJSON.id)
			}
		})
	},
	
	addSearchableTags: function(){
		var availableTags = []
		this.tags.forEach(function(tag){
			availableTags.push(tag.escape("name"))
		})
		$(".add-skill-form").autocomplete({
			source: availableTags,
			minLength: 2
		})
	},
	
})