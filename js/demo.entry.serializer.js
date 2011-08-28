(function(win, doc){

Serializer.register(Entry, {

	paturn: 'entry={title}|{content}',

	params: {
		title: '.*',
		content: '.*'
	},

	serialize: function(entry){
		return this.assemble({
			title: entry.getTitle(),
			content: entry.getContent()
		});
	},

	deserialize: function(params){
		return new Entry(params.title, params.content);
	}

});

}(window, document));
