window.Bridge.Views.Profile = Backbone.CompositeView.extend({
	initialize: function(options){
		this.tags = options.tags;
		this.availableTags = [];
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.tags, "sync", this.createAvailableTags)
	},
	
	template: JST["user/profile"],
	
	addPassionView: function(){
    var passionView = new Bridge.Views.Passion({model: this.model, parentView: this})
    this.addSubview("#passion-view-holder", passionView);
    passionView.render();
	},
	
	addPersonalInfoView: function(){
		var personalInfoView = new Bridge.Views.PersonalInfo({model: this.model, parentView: this})
		this.addSubview("#personal-info-holder", personalInfoView)
		personalInfoView.render();
	},
	
	addSkillView: function(){
    var skillView = new Bridge.Views.Skill({model: this.model, parentView: this})
    this.addSubview("#skill-view-holder", skillView);
    skillView.render();
	},
	
	addSummaryView: function(){
		var summaryView = new Bridge.Views.Summary({model: this.model, parentView: this})
		this.addSubview("#summary-view-holder", summaryView)
		summaryView.render();
	},
	
	createAvailableTags: function(){
		var that = this;
		this.tags.forEach(function(tag){
			that.availableTags.push(tag.escape("name"))
		})
	},	
	
	render: function(){
		var renderedContent = this.template( {user: this.model, skills: this.model.skills()})
		this.$el.html(renderedContent)
		this.addSkillView();
		this.addPassionView();
		this.addPersonalInfoView();
		this.addSummaryView();
		return this
	},
	
	makeFormSearchable: function(formId){
		var that = this;
		$(formId).autocomplete({
			source: that.availableTags,
			minLength: 2
		})
	},
	
	parseTagName: function(input){
		var tagName = $(input).val();
		tagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);
		return tagName
	}
	
})