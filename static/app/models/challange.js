App.Challenge = Backbone.Model.extend({
	idAttribute: '_id',
	title: '',
	type: '',
	comments: [],
		/*{
			name: '',
			comment:''
		}*/
	challenger: '',
	challengee: '',
	status: 'pending', // pending | in-process | done | declined,
	url: function () {
	    return this.id ? '/api/challenges/' + this.id :  '/api/challenges';
	  },
    idAttribute: "_id"
});