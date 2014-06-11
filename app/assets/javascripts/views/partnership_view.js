window.Bridge.Views.Partnership = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render)
	},
	
	template: JST["user/partnership"],
	
	render: function(){
		var renderedContent = this.template({partners: this.collection});
		this.$el.html(renderedContent);
		return this
	}
	
})