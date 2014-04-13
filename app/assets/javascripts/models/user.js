window.Bridge.Models.User = Backbone.Model.extend({
	urlRoot: "/api/users",
	
	parse: function(jsonResp){
		if(jsonResp.tags){
			this.tags().set(jsonResp.tags)
			delete jsonResp.tags
		}
		return jsonResp
	},
	
	tags: function(){
		if(!this._tags){
			this._tags = new Bridge.Collections.Tags()
		}
		return this._tags
	}
})