window.Bridge.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "index",
		"profile": "profile",
		"profile/edit": "editProfile"
	},
	
	editProfile: function(){
		var user = Bridge.Data.users.getOrFetch(currentUserId);
		var editProfileView = new Bridge.Views.editProfile({model: user})
		this._swapView(editProfileView)
	},
	
	index: function(){
		if (currentUserId){
			
		}
		else{
			var indexView = new Bridge.Views.Launch()
			this._swapView(indexView)
		}
	},
	
	profile: function(){
		if (currentUserId){
			var tags = Bridge.Data.tags.fetch()
			var user = Bridge.Data.users.getOrFetch(currentUserId)
			var profileView = new Bridge.Views.Profile({model: user, tags: tags})
			this._swapView(profileView)
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