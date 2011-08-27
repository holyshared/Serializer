(function(win, doc){

var User = new Class({

    initialize: function(){
        this.name = name;
        this.email = email;
    },

    getName: function(){
		return this.name;
    },

	getEmail: function(){
		return this.email;
    }

});

new Type('user', User);

}(window, document));