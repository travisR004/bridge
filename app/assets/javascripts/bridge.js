window.Bridge = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Bridge.Routers.AppRouter();
		Backbone.history.start();
  }
};

$(document).ready(function(){
  Bridge.initialize();
});
