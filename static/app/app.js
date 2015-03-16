/*global Backbone */
'use strict';

window.App.addRegions({
	regionContent: ".content"
});

window.App.addInitializer(function(){
    
    // Render the layout and get it on the screen, first
	window.App.challenges = new window.App.Challenges();
	window.App.users = new window.App.Users();
	window.App.user = new window.App.User();
    window.App.challenges.fetch();

    /*window.setInterval(function () {
		window.App.challenges.fetch();
    }, 3000);*/

    // This kicks off the rest of the app, through the router
    window.App.router = new window.App.Router();
	Backbone.history.start();
});
window.App.start();