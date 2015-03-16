(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['feed-item.hb'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"info\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.challenger)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " have been challenged by "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.challengee)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		<a class=\"accept\" href=\"#\">accept</a>\n		<a class=\"decline\" href=\"#\">decline</a>\n	";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div>Winner:</div>\n		<a class=\"winner-cher\" href=\"#\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.challenger)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n		<a class=\"winner-chee\" href=\"#\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.challengee)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n	";
  return buffer;
  }

  buffer += "<div class=\"picture from\">\n	<img src=\"http://biz.prlog.org/InvokeMediaLabs/logo.jpg\">\n</div>\n<div class='item-info'>\n	<h3 class=\"challenge-name\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " - ";
  if (stack1 = helpers.type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.type); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n	\n	";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.ifCond || (depth0 && depth0.ifCond)),stack1 ? stack1.call(depth0, (depth0 && depth0.status), "pending", options) : helperMissing.call(depth0, "ifCond", (depth0 && depth0.status), "pending", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n	";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.ifCond || (depth0 && depth0.ifCond)),stack1 ? stack1.call(depth0, (depth0 && depth0.status), "in-process", options) : helperMissing.call(depth0, "ifCond", (depth0 && depth0.status), "in-process", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n</div>\n<div class=\"picture to\">\n	<img src=\"http://biz.prlog.org/InvokeMediaLabs/logo.jpg\">\n</div>\n\n";
  return buffer;
  });
templates['new-challange.hb'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function";


  buffer += "<form>\n	<ul class='col-left'>\n		";
  if (stack1 = helpers.usersList) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.usersList); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</ul>\n	<div class='col-right'>\n		<h3>name your challenge:</h3>\n		<input type='text' name='title' id='title'>\n		<h3>challenge type:</h3>\n		<input type='text' name='type' id=\"type\">\n		<!--<h3>challenge start:</h3>\n		<input type='text' name='datetime'>-->\n		<h3>add a comment:</h3>\n		\n	</div>\n	<button>challenge</button>\n</form>";
  return buffer;
  });
templates['profile.hb'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class='profile-info'>\n	<div class='picture'>\n		<img src=\"test-image.png\" height=\"100%\" width=\"100%\">\n	</div>\n	<div class='name'>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n	<div class='email'>";
  if (stack1 = helpers.email) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.email); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n	\n	<ul class='profile-stats'>\n		<li class=\"wins\">\n			<div>wins:</div>\n			<div>0</div>\n		</li>\n		<li class=\"loses\">\n			<div>loses:</div>\n			<div>0</div>\n		</li>\n		<li class=\"challenges\">\n			<div>challenges:</div>\n			<div>0</div>\n		</li>\n	</ul>\n</div>\n\n<div class=\"profile-feed\">\n	<div class=\"feed-item-header\">My Challenges:</div>\n	<ul class='feed'>\n		\n	</ul>\n</div>\n";
  return buffer;
  });
})();