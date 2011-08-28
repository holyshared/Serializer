
Serializer.js
==========================================================

Class: Serializer
----------------------------------------------------------

	//Registration of type
	Serializer.register(User, {
	
	    paturn: '{name}:{email}',
	
	    params: {
	        name: '\\w+',
	        email: '\\w+'
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

	//From the object to the character string
	var myUser = new User('holyshared', 'email');

    var serializer = new Serializer();
	var source = serializer.serialize(myUser); //holyshared:email

### Methods

* register - The conversion rule of the object is registered.
* unregister - The conversion rule of the object is deleted.
* serialize - The object is converted into the character string.
* deserialize - It converts it from the character string into the object.
