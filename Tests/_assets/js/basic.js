(function(win, doc){

function User(name, email){
    this.name = name;
    this.email = email;
}
this.User = User;

User.prototype = {

	getName: function(){
		return this.name;
	},

	getEmail: function(){
		return this.email;
	}

}

new Type('user', User);

}(window, document));