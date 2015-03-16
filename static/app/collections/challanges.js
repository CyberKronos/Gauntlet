App.Challenges = Backbone.Collection.extend({
	url: '/api/challenges',
	model: App.Challenge,
	count: function (id, type) {
		var result = 0;
		for (var i = 0; i < this.length; i++) {
			if (this.models[i].get('from') === id || this.models[i].get('to') === id) {
				if (type === 'loses' && this.models[i].get('status') === 'done' && this.models[i].get('winner') !== id) {
					result++;
				} else if (type === 'wins' && this.models[i].get('status') === 'done' && this.models[i].get('winner') === id) {
					result++;
				} else if (type === 'challenges') {
					result++;
				}
			}
		}
	return result;
  }
});