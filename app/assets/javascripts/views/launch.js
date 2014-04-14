window.Bridge.Views.Launch = Backbone.View.extend({
	template: JST["root/landing"],
	
	render: function(){
		var renderedContent = this.template()
		this.$el.html(renderedContent)
		return this
	},
	
	events: {
		"submit #sign-in": "signIn",
		"submit #sign-up": "signOut"
	},
	
	// signIn: function(event){
	// 	event.preventDefault();
	// 	var data = $(event.target).serializeJSON()
	// 	$.ajax({
	// 	  url: 'session',
	//       type: 'POST',
	//       data: data,
	//       success: function(resp){
	//         currentUserId = resp.id
	// 			$("#login-modal").modal("hide")
	// 			$('#login-modal').on('hidden.bs.modal', function () {
	// 				$(".hide-header").toggleClass("hide-header")
	// 				Backbone.history.navigate("profile", {trigger: true})
	// 			})
	// 		}
	//   })
	// },
	
	// signOut: function(event){
	// 	event.preventDefault();
	// 	var data = $(event.target).serializeJSON();
	// 	$.ajax({
	// 		url: "api/users",
	// 		type: "POST",
	// 		data: data,
	// 		success: function(resp){
	//       currentUserId = resp.id
	// 			$("#signup-modal").modal("hide")
	// 			$('#signup-modal').on('hidden.bs.modal', function () {
	// 				$(".hide-header").toggleClass("hide-header")
	// 				Backbone.history.navigate("profile", {trigger: true})
	// 			})
	// 		}
	// 	})
	// }
})