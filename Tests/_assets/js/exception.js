(function(win, doc){

function User(name, email){
    this.name = name;
    this.email = email;
}
new Type('user', User);

function Unregister() {
};
new Type('unregister', Unregister);



Serializer.register(User, {

    paturn: '{name}:{email}',

    params: {
        name: '\w+',
        email: '\w+'
    },

    serialize: function(object) {
        return this.assemble({
	        name: object.getName(),
	        email: object.getEmail()
        });
    },

    deserialize: function(params) {
        return new User(params.name, params.email);
    }

});

win.addEventListener('load', function(){

	try {
		Serializer.register(User, {
		    paturn: ':name\::email',
		    params: {
		        name: '\w+',
		        email: '\w+'
		    },
		    serialize: function(object){},
		    deserialize: function(params){}
		});
	} catch(e){
		var text = (e.message == 'The specified data type has already been registered.') ? 'Register exception OK' : 'Register exception NG';
	
		addMessage(text);
	}


	try {
		Serializer.unregister(Unregister);
	} catch(e){
		var text = (e.message == 'The specified data type is not registered.') ? 'Unregister exception OK' : 'Unregister exception NG';
	
		addMessage(text);
	}

});

}(window, document));