window.Bridge.Views.Partners = Backbone.View.extend({
	
	template: JST["user/partners"],
	
	render: function(){
		var renderedContent = this.template({user: this.model, partners: this.user.partners()});
		this.$el.html(renderedContent);
		return this;
	}
	
})