App.FeedCollectionView = Backbone.Marionette.CollectionView.extend({
	itemView: App.FeedItemView,
	tagName: 'ul',
	className: 'feed',
	initialize: function () {
		this.itemView = App.FeedItemView;
		// this.emptyView = App.FeedItemView;
	}
});