
Serializer
====================================

![Screenshot](http://holyshared.github.com/Serializer/logo.png)

The object of the defined type is restored from the character string and the character string to the object with Type.  

How to use
------------------------------------

### Definition of data type

A new data type is defined by using **Type**. 
The User type is defined in the following example.

	function User(name, email){
		this.name = name;
		this.email = email;
	}

	User.prototype = {
		getName: function(){
			return this.name;
		},
	
		getEmail: function(){
			return this.email;
		}
	};

	new Type('User', User);

### The type is registered in a Serializer.

The data type and the conversion rule are specified for the argument. 
The restoration from the character string uses and restores the regular expression.

	//Register user
	Serializer.register(User, {
	
		paturn: '{name}={email}', //It is {name} and {email} placeholder.
	
		params: {
			name: '\\w+',
			email: '\\w+'
		},

		serialize: function(object){
			return this.assemble({
		        name: object.name,
		        email: object.email
	        });
		},
	
		deserialize: function(params){
			return new User(params.name, params.user);
		}
	
	});

### It actually uses it. 

It converts into the character string with **serialize**, and it converts it from the character string into the object with **deserialize**.  
It is possible to convert it from the character string into the object from the object to the character string by this freely.  

	//It converts it from the object to the character string. 
	var user = new User('username', 'user-email');
	
	var serializer = new Serializer();
	var source = serializer.serialize(user); //Return username=user-email
	
	//It restores it from the character string to the object.
	var user = serializer.deserialize(source); //Return user object
	console.log(user.getName()); //Character string username is output. 
	console.log(user.getEmail()); //Character string user-email is output. 
