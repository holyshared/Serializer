(function(){

    var Serializer = this.Serializer = function(){};

    var container = {

        types: {},

        get: function(type){
            return this.types[type];
        },

        add: function(type, item){
            this.types[type] = item;
        },

        remove: function(type){
            delete this.types[type];
        },

        serialize: function(object){
            var name = typeOf(object);
            var converter = this.get(name);

            return converter.serialize(object);
        },

        deserialize: function(source){
            var types = this.types;
            var target = null;
            var params = null;
            Object.each(types, function(converter, key){
                params = converter.match(source);
                if (params) {
                    target = converter;
                    return false;
                }
            });
            if (!target) {
                throw new Error('not match');
            }
            return target.deserialize(params);
        }

    };

    Serializer.implement({
        serialize: function(object){
            return container.serialize(object);
        },

        deserialize: function(source){
            return container.deserialize(source);
        }
    });

    Object.append(Serializer, {

        register: function(type, converter){
            var key = typeOf(type.prototype);
            var converter = new Serializer.Converter(converter);
            container.add(key, converter);
        },

        unregister: function(type){
            var key = typeOf(type.prototype);
            container.remove(key);
        }

    });

    var Converter = Serializer.Converter = function(converter){
        Object.each(converter, function(method, key){
            this[key] = method;
        }, this);
    };


    Converter.implement({

        _getRegExp: function(){
            var paturn = this.paturn;
            Object.each(this.params, function(token, keyword){
                paturn = paturn.replace(':' + keyword, '(\\' + token + ')');
            });
            paturn = paturn.replace('\:', ':');

            return new RegExp(paturn, 'i');
        },

        match: function(source){
            var re = this._getRegExp();
            var map = null;

            if (!re.test(source)){
                return;
            }

            var params = source.match(re);
            var target = params.shift();

            var keys = Object.keys(this.params);
            try {
                map = params.associate(keys);
            } catch(exp) {
                throw new Error('');
            }
            return map;
        }

    });

}());
