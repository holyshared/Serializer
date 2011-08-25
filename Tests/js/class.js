(function(win, doc){

var User = new Class({

    initialize: function(){
        this.name = name;
        this.email = email;
    }

    getName: functrion(){
        return this.name;
    },

    getEmail: functrion(){
        return this.email;
    }

});


new Type('user', User);


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

    //serialize
    var container = doc.getElementById('messages');

    var message = doc.createElement('p');
    var messageText = doc.createTextNode(source);

    message.appendChild(messageText);
    container.appendChild(message);


    //deserialize
    var user = serializer.deserialize(source);

    var message = doc.createElement('p');
    var messageText = doc.createTextNode(user.name + ':'+ user.email);

    message.appendChild(messageText);
    container.appendChild(message);

});


}(window, document));