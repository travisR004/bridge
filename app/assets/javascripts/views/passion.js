window.Bridge.Views.Passion = Backbone.View.extend({
	initialize: function(options){
		this.parentView = options.parentView
		this.tags = options.parentView.tags
		this.openPassionForm = false;
	},
	
	template: JST["user/passion"],
	
	render: function(){
		var renderedContent = this.template({passions: this.model.passions(), tags: this.tags})
		this.$el.html(renderedContent);
		return this;
	},
	
	events: {
		"click #add-passion": "revealAddPassionForm",
		"mouseenter #passion-holder": "showAddPassionButton",
		"blur #add-passion-form": "hideAddPassionForm",
		"mousedown #submit-passion": "addPassion",
		"click #submit-passion": "stopQuery",
		"change select": "getNewTags"
	},
	
	getNewTags: function(){
		var tagName = this.parentView.parseTagName("#add-passion-input");
		this.tags.fetch({
			data: {tag_name: tagName},
			success: function(data){
				$("#breadcrumbs").append(tagName + "<")
				$("#add-passion-input").html("<option value=''>Select Your Passion</option>");
				data.models[0].attributes.children.forEach(function(child){
					$("#add-passion-input").append("<option value='" + child.name + "'>" + child.name + "</option>");
				})
			}
		})
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
		$("#add-passion").removeClass("hidden");
		this.openPassionForm = false;
	},
	
	revealAddPassionForm: function(event){
		// this.parentView.makeFormSearchable("#add-passion-input");
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