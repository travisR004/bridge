window.Bridge.Collections.Partnerships = Backbone.Collection.extend({
	url: "/api/partnerships",
	
	getOrFetch: function(id){
    var model;
    var partnerships = this;

    if(model = partnerhips.get(id)){
      model.fetch();
      return model;
    } else {
      model = new Bridge.Models.Partnerships({id: id});
      model.fetch({
        success: function(){
          partnerships.add(model)
        }
      });
      return model
    }
  }
	
})