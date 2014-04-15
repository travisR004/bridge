window.Bridge.Models.User = Backbone.Model.extend({
	urlRoot: "/api/users",
	
	parse: function(jsonResp){
		if(jsonResp.passions){
			this.passions().set(jsonResp.passions)
			delete jsonResp.passions
		}
		if(jsonResp.skills){
			this.skills().set(jsonResp.skills)
			delete jsonResp.skills
		}
		return jsonResp
	},
	
	passions: function(){
		if(!this._passions){
			this._passions = new Bridge.Collections.Tags()
		}
		return this._passions
	},
	
	skills: function(){
		if(!this._skills){
			this._skills = new Bridge.Collections.Tags();
		}
		return this._skills
	}
})