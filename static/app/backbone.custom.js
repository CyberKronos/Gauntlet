Backbone.Marionette.CollectionView.prototype.addChildView = function (item, collection, options) {
	var filter = this.options.filter || this.filter;
	if (filter && !filter(item)) { return; }
	this.closeEmptyView();
	var ItemView = this.getItemView(item);
	var index = this.collection.indexOf(item);
	this.addItemView(item, ItemView, index);
};
Backbone.Marionette.CollectionView.prototype.showCollection = function () {
  /*var filter = this.options.filter || this.filter;
  var that = this;
  var ItemView = this.getItemView();
  this.collection.each(function(item, index){
  if (filter && ! filter(item)) return;
  that.addItemView(item, ItemView, index);
  });*/

  var filter = this.options.filter || this.filter;
  var ItemView;
  var self = this;
  this.collection.each(function (item, index){
    if (filter && ! filter.call(self, item)) return;
    ItemView = this.getItemView(item);
    this.addItemView(item, ItemView, index);
  }, this);
};