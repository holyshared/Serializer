(function(win, doc){

var Observer = this.Observer = {

	initialize: function(){
		this.strategy = this.getStrategy();
	},

	register: function(){
		this.strategy.register.apply(this.strategy, arguments);
	},

	unregister: function(){
		this.strategy.unregister.apply(this.strategy, arguments);
	},

	getStrategy: function(){
		if (win.addEventListener) {
			return Observer.ModanObserver;
		} else {
			return Observer.LegacyObserver;
		}
	}

};

Observer.ModanObserver = {
	register: function(target, type, handler){
		target.addEventListener(type, handler, false);
	},

	unregister: function(target, type, handler){
		target.removeEventListener(type, handler, false);
	}
};

Observer.LegacyObserver = {
	register: function(target, type, handler){
		target.attachEvent(type, handler);
	},

	unregister: function(){
		target.dettachEvent(type, handler);
	}
};

Observer.initialize.call(Observer);

}(window, document));
