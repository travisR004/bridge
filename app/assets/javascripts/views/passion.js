window.Bridge.Views.Passion = Backbone.View.extend({
	initialize: function(options){
		this.parentView = options.parentView
		this.openPassionForm = false;
	},
	
	template: JST["user/passion"],
	
	render: function(){
		var renderedContent = this.template({passions: this.model.passions()})
		this.$el.html(renderedContent);
		return this;
	},
	
	events: {
		"click #add-passion": "revealAddPassionForm",
		"click #add-first-passion": "revealAddPassionForm",
		"blur #add-passion-form": "hideAddPassionForm",
		"mouseenter #passion-holder": "showAddPassionButton",
		"mouseleave #passion-holder": "hideAddPassionButton",
		"mousedown #submit-passion": "addPassion",
		"click #submit-passion": "stopQuery"
	},
	
	addPassion: function(event){
		var that = this;
		var tagName = this.parentView.parseTagName("#add-passion-input")
		var tagModel = new Bridge.Models.Tag();
		tagModel.save({name: tagName}, {
			success: function(resp){
				var newPassion = new Bridge.Models.PassionJoin();
				newPassion.save({passion_join: {tag_id: resp.id}});
				that.parentView.tags.fetch()
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
	
	hideAddPassionButton: function(){
		$("#add-passion").addClass("hidden")
	},
	
	hideAddPassionForm: function(){
		$("#add-passion-form").addClass("hidden");
		this.openPassionForm = false;
	},
	
	revealAddPassionForm: function(event){
		this.parentView.makeFormSearchable("#add-passion-input");
		$("#add-passion-form").removeClass("hidden")
		$("#add-passion-input").focus();
		this.hideAddPassionButton();
		this.openPassionForm = true;
	},
	
	showAddPassionButton: function(){
		if(!this.openPassionForm){
			$("#add-passion").removeClass("hidden")
		}
	},
	
	stopQuery: function(event){
		event.preventDefault();
	}
})