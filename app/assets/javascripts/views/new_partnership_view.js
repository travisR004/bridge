window.Bridge.Views.NewPartnership = Backbone.View.extend({
	
	template: JST["user/new_partnership"],
	
	render: function(){
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this
	}
	
})