(function(win, doc){

var User = this.User = new Class({

    initialize: function(name, email){
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