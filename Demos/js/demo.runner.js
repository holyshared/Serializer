(function(win, doc){

var Controller = {

	setUp: function(){
		this.entry = new Entry();
		this.serializeButton = doc.getElementById('serialize');
		this.serializeTitle = doc.getElementById('serializeTitle');
		this.serializeContent = doc.getElementById('serializeContent');
		this.serializeSource = doc.getElementById('serializeSource');

		this.deserializeButton = doc.getElementById('deserialize');
		this.deserializeTitle = doc.getElementById('deserializeTitle');
		this.deserializeContent = doc.getElementById('deserializeContent');
		this.deserializeSource = doc.getElementById('deserializeSource');

		Observer.register(this.serializeButton, 'click', this.proxy(this.onSerializeClick));
		Observer.register(this.deserializeButton, 'click', this.proxy(this.onDeserializeClick));
//		Observer.register(this.serializeTitle, 'change', this.proxy(this.onTitleChanged));
//		Observer.register(this.serializeContent, 'change', this.proxy(this.onContentChanged));
	},

/*
	onTitleChanged: function(){
console.log('onTitleChanged');
console.log(this.serializeTitle.getAttribute('value'));

		this.entry.setTitle(this.serializeTitle.getAttribute('value'));
	},

	onContentChanged: function(){
console.log('onContentChanged');
console.log(this.serializeContent.innerHTML);
		this.entry.setContent(this.serializeContent.textContent);
	},
*/
	onSerializeClick: function(event){
		var entry = this.entry;
		entry.setTitle(this.serializeTitle.value)
			.setContent(this.serializeContent.value);

		var serializer = new Serializer();
		var source = serializer.serialize(entry);
		this.serializeSource.value = source;
		this.deserializeSource.value = source;
	},

	onDeserializeClick: function(event){
		var source = this.deserializeSource.value;
		var serializer = new Serializer();
		var entry = serializer.deserialize(source);
		this.deserializeTitle.value = entry.getTitle();
		this.deserializeContent.value = entry.getContent();
	},

	tearDown: function(){
	},

	proxy: function(handler){
		var that = this; 
		return function(event){
			handler.apply(that, [event]);
		};
	}

};

Observer.register(win, 'load', function(){
	Controller.setUp.call(Controller);
});
Observer.register(win, 'unload', function(){
	Controller.tearDown.call(Controller);
});

}(window, document));
