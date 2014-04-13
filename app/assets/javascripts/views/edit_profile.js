window.Bridge.Views.editProfile = Backbone.View.extend({
	initialize: function(options){
		this.tagIds = []
		this.tags = options.tags
		this.listenTo(this.model, "sync", this.render)
		this.listenTo(this.tags, "sync", this.addSearchableTags)
	},
	
	template: JST["user/edit_profile"],
	
	events: {
		"submit #edit-profile": "updateProfile",
		"click #add-tag": "addTag"
	},
	
	addTag: function(event){
		event.preventDefault();
		event.stopPropagation();
		var that = this;
		var tagName = $("#tags").val();
		tagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);
		$(".tags").append(tagName);
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
		$("#tags").autocomplete({
			source: availableTags,
			minLength: 2
		})
	},
	
	render: function(){
		var renderedContent = this.template({user: this.model, savedTags: this.model.tags()})
		this.$el.html(renderedContent)
		this.addSearchableTags()
		return this
	},
	
	updateProfile: function(event){
		event.preventDefault();
		var data = $(event.target).serializeJSON();
		var tags = $
		this.model.save(data)
		this.tagIds.forEach(function(tagId){
			var userJoinTag = new Bridge.Models.UserJoinTag()
			userJoinTag.save({user_join_tag: {tag_id: tagId}})
		})
		this.model.fetch()
		this.tags.fetch()
	}
})