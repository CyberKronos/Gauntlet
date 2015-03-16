App.ProfileCompositeView = Backbone.Marionette.CompositeView.extend({
	itemView: App.FeedItemView,

	// specify a jQuery selector to put the itemView instances in to
	itemViewContainer: ".feed",

	template: Handlebars.templates['profile.hb'],
	initialize: function () {
		this.itemView = App.FeedItemView;
		// this.emptyView = App.FeedItemView;
		this.listenTo(App.challenges, 'change', this.updateCounts);
	},
	onRender: function () {
		this.updateCounts();
	},
	updateCounts: function () {
		$('.profile-stats .loses div:nth-child(2)').html(this.collection.count(this.model.get('id'), 'loses'));
		$('.profile-stats .wins div:nth-child(2)').html(this.collection.count(this.model.get('id'), 'wins'));
		$('.profile-stats .challenges div:nth-child(2)').html(this.collection.count(this.model.get('id'), 'challenges'));
	},
	filter: function (item) {
		return true;
		return (item.get('challenger') === App.user('id') || item.get('challengee') === App.user('id'));
	}
});