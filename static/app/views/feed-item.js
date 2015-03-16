App.FeedItemView = Backbone.Marionette.ItemView.extend({
	tagName: 'li',
	template: Handlebars.templates['feed-item.hb'],
	events: {
		'click .accept': 'acceptAction',
		'click .decline': 'declineAction',
		'keyup .comment-send textarea': 'addComment',
		'click .winner-cher': 'winnerCher',
		'click .winner-chee': 'winnerChee'
	},
	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
	},
	winnerCher: function () {
		this.model.set('winner', this.model.get('challenger.id'));
		this.model.save();
	},
	winnerChee: function () {
		this.model.set('winner', this.model.get('challengee.id'));
		this.model.save();
	},
	acceptAction: function (e) {
		e.preventDefault();

		this.model.set('status', 'in-process');
		this.model.save();
	},
	declineAction: function (e) {
		e.preventDefault();
		this.model.destroy();
	},
	addComment: function (e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			if (this.model.get('comments')) {
				this.model.set('comments', this.model.get('comments').push({
					username: App.username,
					comment: $(e.target).val()
				}));
			} else {
				this.model.attributes.comments = [{
					username: App.username,
					comment: $(e.target).val()
				}];
			}
			console.log([{
					username: App.username,
					comment: $(e.target).val()
				}]);
			console.log(this.model.attributes.comments);
		}
	}
});