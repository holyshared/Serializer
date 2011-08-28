(function(win, doc){
	
	var Entry = this.Entry = function(title, content){
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

}(window, document));
