App.User = Backbone.Model.extend({
    name: '',
    email: '',
    url: function() { return this.id ? '/api/users/' + this.id : '/api/users'; },
    idAttribute: "_id"
});