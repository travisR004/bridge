window.Bridge.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "index",
		"create": "create",
		"profile": "profile",
		"profile/edit": "editProfile",
		"projects": "projects",
		"projects/new": "newProject",
		"projects/:id": "showProject",
		"explore": "explore"
	},
	
	create: function(){
		if(currentUserId){
			$(".active-headliner").removeClass("active-headliner")
			$("#create").addClass("active-headliner")
			var createView = new Bridge.Views.CreatePage();
			this._swapView(createView)
		} else {
			this.index()
		}
	},
	
	explore: function(){
		$(".active-headliner").removeClass("active-headliner")
		$("#explore").addClass("active-headliner")
		var projects = new Bridge.Collections.Projects();
		projects.fetch({
	    traditional: true,
    	data: {explore: true}
		});
		var exploreView = new Bridge.Views.Explore({collection: projects})
		this._swapView(exploreView)
	},
	
	showProject: function(id){
		var project = new Bridge.Collections.Projects().getOrFetch(id)
		var projectView = new Bridge.Views.Project({model: project}) 
		this._swapView(projectView)
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
			$(".active-headliner").removeClass("active-headliner")
			$("#profile").addClass("active-headliner")
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
			$(".active-headliner").removeClass("active-headliner")
			$("#projects").addClass("active-headliner")
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