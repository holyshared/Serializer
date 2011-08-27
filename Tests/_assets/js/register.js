(function(win, doc){

function User(name, email){
    this.name = name;
    this.email = email;
}

new Type('user', User);

win.addEventListener('load', function(){

	var converter = {
	    paturn: ':name\::email',
	    params: {
	        name: '\w+',
	        email: '\w+'
	    },
	    serialize: function(object) {},
	    deserialize: function(params) {}
	};

	Serializer.register(User, converter);

	Serializer.unregister(User);

	Serializer.register(User, converter);
	
	addMessage('Register OK');

});

}(window, document));