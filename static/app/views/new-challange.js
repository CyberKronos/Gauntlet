App.ChallangeNewView = Backbone.Marionette.ItemView.extend({
	template: Handlebars.templates['new-challange.hb'],
	className: 'new-challenge',
	events: {
		'submit form': 'addModel'
	},
	addModel: function (e) {
		e.preventDefault();
		var form = $('form', this.$el);
		var ch = new App.Challenge({
			title: form.find('input[name=title]').val(),
			type: form.find('input[name=type]').val(),
			// comments: [form.find('input[name=comment]')],
			challenger: form.find('select[name=challangee]').val(),
			status: 'pending' // pending | in-process | done | declined
		});
		App.challenges.add(ch);
		ch.save();
		App.router.navigate('/feed', true);
	}
});