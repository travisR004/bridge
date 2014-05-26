window.Bridge.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "index",
		"create": "create",
		"profile": "profile",
		"profile/edit": "editProfile",
		"projects": "projects",
		"projects/new": "newProject",
		"projects/:id": "showProject",
		"explore": "explore",
		"partnerships/new": "newPartnership"
	},
	
	create: function(){
		if(currentUserId){
			$(".active-headliner").removeClass("active-headliner")
			$("#create").addClass("active-headliner")
			var createView = new Bridge.Views.CreatePage();
			this._swapView(createView);
			$(document).scrollTop(0);
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
		$(document).scrollTop(0);
	},
	
	showProject: function(id){
		var project = new Bridge.Collections.Projects().getOrFetch(id)
		var projectView = new Bridge.Views.Project({model: project}) 
		this._swapView(projectView)
		$(document).scrollTop(0);
	},
	
	index: function(){
		if(currentUserId){
			this.profile()
		} else {
			var indexView = new Bridge.Views.Launch()
			this._swapView(indexView)
		}
	},
	
	newPartnership: function(){
		if(currentUserId){
			var newPartnershipView = new Bridge.Views.NewPartnership();
			this._swapView(newPartnershipView);
		} else {
			this.index();
		}
		
	},
	
	newProject: function(){
		if(currentUserId){
			var tags = Bridge.Data.tags
			tags.fetch()
			var newProjectView = new Bridge.Views.NewProject({tags: tags});
			this._swapView(newProjectView);
			$(document).scrollTop(0);
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
			$(document).scrollTop(0);
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
			$(document).scrollTop(0);
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