Handlebars.registerHelper('usersList', function () {
	var node = null;
	var result = '';
	for (var i in window.App.users.models) {
		var user = window.App.users.models[i];
		var id = user.get('_id');
		node = "<li>";
		node += "<input type='radio' name='challengee' value='id' id='radio-" + user.get('_id') + "'>";
		node += "<label for='radio-" + user.get('_id') + "'>" + user.get('name') + "</label>";
		node += "</li>";
		result += node;
		console.log('123');
	}
	return result;
});
Handlebars.registerHelper('ifCond', function (v1, v2, options) {
	if (v1 === v2) {
		return options.fn(this);
	}
	return options.inverse(this);
});