window.Bridge.Collections.Users = Backbone.Collection.extend({
	url: "/api/projects",
	
	getOrFetch: function(id){
    var model;
    var projects = this;

    if(model = projects.get(id)){
      model.fetch();
      return model;
    } else {
      model = new Bridge.Models.Project({id: id});
      model.fetch({
        success: function(){
          projects.add(model)
        }
      });
      return model
    }
  }
})