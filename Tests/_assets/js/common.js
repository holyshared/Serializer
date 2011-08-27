(function(win, doc){

Serializer.register(User, {

    paturn: ':name\::email',

    params: {
        name: '\w+',
        email: '\w+'
    },

    serialize: function(object) {
        return [object.getName(), ':', object.getEmail()].join('');
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

	addMessage(user.name + ':'+ user.email);

});


}(window, document));