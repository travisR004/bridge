window.Bridge.Views.Launch = Backbone.View.extend({
	template: JST["root/launch"],
	
	render: function(){
		var renderedContent = this.template()
		this.$el.html(renderedContent)
		return this
	},
	
	events: {
		"submit #sign-in": "signIn",
		"submit #sign-up": "signUp"
	},
	
	signUp: function(event){
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON()
    $.ajax({
      url: 'api/users',
      type: "POST",
      data: data,
      success:function(resp){
        window.location = "";
      },
      error: function(response){
        response.responseJSON.forEach(function(response){
          $("#signup-errors").html("<p>" + response + "</p>")
        })
      }
    })
  },
	
	signIn: function(event){
      event.preventDefault();
      var data = $(event.currentTarget).serializeJSON()
      $.ajax({
        url: 'session',
        type: "POST",
        data: data,
        success:function(resp){
          window.location = "";
        },
        error: function(response){
          response.responseJSON.forEach(function(response){
            $("#login-errors").html("<p>" + response + "</p>")
          })
        }
      })
    }
	
})