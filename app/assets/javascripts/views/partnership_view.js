window.Bridge.Views.Partnership = Backbone.View.extend({
	initialize: function(options){
		this.pendingRequests = options.pendingRequests
		this.listenTo(this.collection, "sync", this.render)
		this.listenTo(this.pendingRequests, "sync", this.render)
	},
	
	template: JST["user/partnership"],
	
	render: function(){
		debugger
		var renderedContent = this.template({partners: this.collection});
		this.$el.html(renderedContent);
		return this
	}
	
})