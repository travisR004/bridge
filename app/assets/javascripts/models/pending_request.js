window.Bridge.Models.PendingRequest = Backbone.Model.extend({
	urlRoot: "/api/pending_requests",
	
	parse: function(jsonResp){
		debugger
		if(jsonResp.in_user){
			this.inUser().set(jsonResp.in_user)
			delete jsonResp.in_user
		}
		if(jsonResp.out_user){
			this.outUser().set(jsonResp.out_user)
			delete jsonResp.out_user
		}
		return jsonResp
	},
	
	inUser: function(){
		if(!this._inUser){
			this._inUser = new Bridge.Model.User()
		}
		return this._inUser;
	},
	
	outUser: function(){
		if(!this._outUsers){
			this._outUser = new Bridge.Model.User();
		}
		return this._outUser
	}
})