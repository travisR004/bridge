window.Bridge = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
	Data: {},
  initialize: function() {
		Bridge.Data.tags = new Bridge.Collections.Tags();
		Bridge.Data.users = new Bridge.Collections.Users();
    new Bridge.Routers.AppRouter();
		Backbone.history.start();
  }
};

$(document).ready(function(){
  Bridge.initialize();
});
