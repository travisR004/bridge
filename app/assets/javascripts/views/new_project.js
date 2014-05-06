window.Bridge.Views.NewProject = Backbone.View.extend({
	template: JST["user/new_project"],
	
	render: function(){
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},
	
	events: {
		"click #add-image": "openFilePicker",
		"change #file-picker": "handleFiles",
		"click #submit-project": "submitProject"
	},
	
	openFilePicker: function(event){
		event.preventDefault();
		$("#file-picker").click()
	},
	
	handleFiles: function(event){
    event.preventDefault();
    var that = this;
    var files = event.target.files;
    for(var i = 0; i < files.length; i++){
      var reader = new FileReader();
      reader.onload = function(ev){
        var $input = $('<input type="hidden" name="image[photo][]">')
        $input.val(ev.target.result);
        $("#project-form").append($input)
      }
      reader.readAsDataURL(files[i]);
    }
    $("#image-titles").append(files[files.length - 1].name + " / ")
  },
	
	submitProject: function(event){
		event.preventDefault();
		var data = $(event.target).parent().parent().parent().parent().serializeJSON();
		var project = new Bridge.Models.Project()
		project.save(data)
	}
	
})