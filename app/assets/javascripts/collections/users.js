window.Bridge.Collections.Users = Backbone.Collection.extend({
	url: "/api/users",
	
	getOrFetch: function(id){
    var model;
    var users = this;

    if(model = users.get(id)){
      model.fetch();
      return model;
    } else {
      model = new Bridge.Models.User({id: id});
      model.fetch({
        success: function(){
          users.add(model)
        }
      });
      return model
    }
  }
})