window.Bridge.Views.Images = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render)
	},
	
	template: JST["user/images"],
	
	render: function(){
		var renderedContent = this.template({images: this.collection})
		this.$el.html(renderedContent)
		return this
	}
})