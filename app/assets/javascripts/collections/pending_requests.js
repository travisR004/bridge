window.Bridge.Collections.PendingRequests = Backbone.Collection.extend({
	url: "/api/pending_requests",
	
	getOrFetch: function(id){
    var model;
    var pending_requests = this;

    if(model = pending_requests.get(id)){
      model.fetch();
      return model;
    } else {
      model = new Bridge.Models.PendingRequests({id: id});
      model.fetch({
        success: function(){
          pending_requests.add(model)
        }
      });
      return model
    }
  }
	
})