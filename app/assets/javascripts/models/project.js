window.Bridge.Models.Project = Backbone.Model.extend({
	urlRoot: "/api/projects",
	
	parse: function(jsonResp){
		if(jsonResp.images){
			this.images().set(jsonResp.images)
			delete jsonResp.images
		}
		
		return jsonResp
	},
	
	images: function(){
		if(!this._images){
			this._images = new Bridge.Collections.Images()
		}
		return this._images
	},
})