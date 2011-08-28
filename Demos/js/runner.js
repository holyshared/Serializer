(function(win, doc){


var Observer = {

	initialize: function(){
		this.strategy = this.getStrategy();
	},

	register: function(target, type, handler){
		this.strategy.register.apply(this.strategy, argument);
	},

	unregister: function(target, type, handler){
		this.strategy.unregister.apply(this.strategy, argument);
	},

	getStrategy: function(){
		if (win.addEventListener) {
			return ModanObserver;
		} else {
			return LegacyObserver;
		}
	}

}.initialize.call(Ovserver);

var ModanObserver = {

	register: function(){
	},

	unregister: function(){
	}
	
};

var LegacyObserver = {

	register: function(){
	},

	unregister: function(){
	}
	
};



(function(){
	
	var Entry = function(title, content){
		this.title = title;
		this.content = content;
	};

	var methods = {
	
		getTitle: function(){
			return this.title;
		},
	
		setTitle: function(title){
			this.title = title;
			return this;
		},
	
		getContent: function(){
			return this.content;
		},
	
		setContent: function(content){
			this.content = content;
			return this;
		}
	};
	
	for (var key in methods){
		Entry.prototype[key] = methods[key];
	}

	new Type('Entry', Entry);

}());




var Controller = {

	setUp: function(){
		this.entry = new Entry();
		this.serializeButton = doc.getElementById('serialize');
		this.deserializeButton = doc.getElementById('deserialize');
		this.title = doc.getElementById('entryTitle');
		this.content = doc.getElementById('entryContent');
		this.source = doc.getElementById('source');

		Observer.register(this.serializeButton, 'click', this.onSerializeClick);
		Observer.register(this.deserializeButton, 'click', this.onDeserializeClick);
		Observer.register(this.title, 'change', this.onTitleChanged);
		Observer.register(this.content, 'change', this.onContentChanged);
	},

	onTitleChanged: function(){
		this.entry.setTitle(this.title.getAttribute('value'));
	},

	onContentChanged: function(){
		this.entry.setContent(this.content.innerText);
	},

	onSerializeClick: function(event){
		var serializer = Serializer();
		var source = serializer.serialize(this.entry);
		this.source.innerText = source;
	},

	onDeserializeClick: function(event){
		var source = '';
		var serializer = Serializer();
		var entry = serializer.deserialize(source);
	},

	tearDown: function(){
	}

};

Observer.register(win, 'load', Controller.setUp);
Observer.register(win, 'unload', Controller.tearDown);

}(window, document));
