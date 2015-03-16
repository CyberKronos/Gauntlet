App.Router = Backbone.Marionette.AppRouter.extend({

	routes: {
		"": "feed",
		"feed": "feed",
		"profile": "profile",
		"new-challange": "challangeNew"
	},
	initialize: function () {
		this.feed();
	},
	profile: function () {
		App.regionContent.show(new App.ProfileCompositeView({collection:App.challenges, model:App.user}));
	},
	feed: function () {
		App.regionContent.show(new App.FeedCollectionView({collection:App.challenges}));
	},
	challangeNew: function () {
		App.users.fetch();
		App.regionContent.show(new App.ChallangeNewView());
	}
});