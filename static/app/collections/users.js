App.Users = Backbone.Collection.extend({
	url: '/api/users',
	model: App.User
});