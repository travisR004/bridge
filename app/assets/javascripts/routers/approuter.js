window.Bridge.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "index",
		"create": "create",
		"profile": "profile",
		"profile/edit": "editProfile",
		"projects": "projects",
		"projects/new": "newProject",
		"images": "images"
	},
	
	create: function(){
		if(currentUserId){
			var createView = new Bridge.Views.CreatePage();
			this._swapView(createView)
		} else {
			this.index()
		}
	},
	
	images: function(){
		var allImages = new Bridge.Collections.Images()
		allImages.fetch()
		var imagesView = new Bridge.Views.Images({collection: allImages}) 
		this._swapView(imagesView)
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
		if(currentUserId){
			this.profile()
		} else {
			var indexView = new Bridge.Views.Launch()
			this._swapView(indexView)
		}
	},
	
	newProject: function(){
		if(currentUserId){
			var tags = Bridge.Data.tags
			tags.fetch()
			var newProjectView = new Bridge.Views.NewProject({tags: tags});
			this._swapView(newProjectView);
		} else {
			this.index();
		}
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