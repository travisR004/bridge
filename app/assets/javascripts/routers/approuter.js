window.Bridge.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "index",
		"profile": "profile",
		"profile/edit": "editProfile",
		"projects": "projects"
	},
	
	editProfile: function(){
		if(currentUserId){
			var tags = Bridge.Data.tags
			tags.fetch()
			var user = Bridge.Data.users.getOrFetch(currentUserId);
			var editProfileView = new Bridge.Views.editProfile({model: user, tags: tags})
			this._swapView(editProfileView)
		} else {
			this.index()
		}
	},
	
	index: function(){
		var indexView = new Bridge.Views.Launch()
		this._swapView(indexView)
	},
	
	profile: function(){
		if (currentUserId){
			var tags = Bridge.Data.tags
			tags.fetch()
			var user = Bridge.Data.users.getOrFetch(currentUserId)
			var profileView = new Bridge.Views.Profile({model: user, tags: tags})
			this._swapView(profileView)
		} else {
			this.index()
		}
	},
	
	projects: function(){
		if (currentUserId){
			var projects = new Bridge.Collections.Projects()
			var projectView = new Bridge.Views.Projects({collection: projects})
			projects.fetch()
			this._swapView(projectView)
		} else {
			this.index()
		}
	},
	
	_swapView: function(view){
	    if(this.currentView){
	      this.currentView.remove();
	    }
	    this.currentView = view
	    $('div#content').html(view.render().$el)
	  }
})