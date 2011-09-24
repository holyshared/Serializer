
Serializer.js
==========================================================

Class: Serializer
----------------------------------------------------------

The function which character-string-izes an object is offered. 
Moreover, an object changes from a character string.

### Methods

#### Static Methods
* <a href="#register">register</a> - The conversion rule of the object is registered.
* <a href="#unregister">unregister</a> - The conversion rule of the object is deleted.
* <a href="#setVariableRule">setVariableRule</a> - The rule of a variable is set up. A default is form like {variable}.
* <a href="#getVariableRule">getVariableRule</a> - The rule of a variable is returned. The rule of a start and an end is returned by an object.

#### Public Methods

* <a href="#serialize">serialize</a> - The object is converted into the character string.
* <a href="#deserialize">deserialize</a> - It converts it from the character string into the object.


### <a id="register">register</a>

The conversion rule of the object is registered.

#### Syntax

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


### <a id="unregister">unregister</a>

The conversion rule of the object is deleted.

#### Syntax

	Serializer.unregister(User);


### <a id="setVariableRule">setVariableRule</a>

The rule of a variable is set up. A default is form like {variable}.

#### Syntax

	Serializer.setVariableRule({
		start: '{%',
		end: '%}'
	});

### <a id="getVariableRule">getVariableRule</a>

The rule of a variable is returned. The rule of a start and an end is returned by an object.

#### Syntax

	var rule = Serializer.getVariableRule();


### <a id="serialize">serialize</a>

The object is converted into the character string.

#### Syntax

	//From the object to the character string
	var myUser = new User('holyshared', 'email');

    var serializer = new Serializer();
	var source = serializer.serialize(myUser); //holyshared:email

### <a id="deserialize">deserialize</a>

It converts it from the character string into the object.

#### Syntax

    var serializer = new Serializer();
	var user = serializer.deserialize('holyshared:email');

	alert(user.getName());
	alert(user.getEmail());