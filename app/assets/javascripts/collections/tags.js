window.Bridge.Collections.Tags = Backbone.Collection.extend({
	url: "/api/tags",
	
	getOrFetch: function(id){
		var model;
		var tags = this;
		
		if(model = tags.get(id)){
			model.fetch()
			return model
		} else {
			model = new Bridge.Models.Tag({id: id})
			model.fetch({
				succes: function(){
					tags.add(model)
				}
			})
			return model
		}
	}
})