(function(win, doc){

Serializer.setVariableRule({ start: '{[', end: ']}' });

Serializer.register(User, {

    paturn: '\\{[name]}={[name]}:\\{[email]}={[email]}',

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


win.addEventListener('load', function(){

    var myUser = new User('holyshared', 'email');

    var serializer = new Serializer();
    var source = serializer.serialize(myUser);

	addMessage(source);

    //deserialize
    var user = serializer.deserialize(source);

	addMessage('{[name]}=' + user.name + ':{[email]}=' + user.email);

});

}(window, document));