window.Bridge.Models.Tag = Backbone.Model.extend({
	urlRoot: "/api/tags",
	
	parse: function(jsonResp){
		if(jsonResp.children){
			this.children().set(jsonResp.children)
			delete jsonResp.images
		}
		
		return jsonResp
	},
	
	children: function(){
		if(!this._children){
			this._children = new Bridge.Collections.Tags()
		}
		return this._children
	},
})