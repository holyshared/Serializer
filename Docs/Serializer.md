
Serializer.js
==========================================================

Class: Serializer
----------------------------------------------------------

Serializer.register(User, {

    paturn: ':name\::email',

    params: {
        name: '\w+',
        email: '\w+'
    },

    serialize: function(object) {
        return [object.name, ':', object.email].join('');
    },

    deserialize: function(params) {
        return new User(params.name, params.email);
    }

});

### Methods

* register - The conversion rule of the object is registered.
* unregister - The conversion rule of the object is deleted.
* serialize - The object is converted into the character string.
* deserialize - It converts it from the character string into the object.
