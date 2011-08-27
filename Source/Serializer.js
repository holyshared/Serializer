/*
---
name: Serializer

description: The object of the defined type is restored from the character string and the character string to the object with Type. 

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Type
  - Core/Array
  - Core/Object

provides:
  - Serializer
...
*/

(function(){

    var Serializer = this.Serializer = function(){};

    var Container = Serializer.Container = {

        types: {},

        get: function(type){
			if (!this.has(type)){
				return false;
			}
			return this.types[type];
        },

        register: function(type, item){
			if (this.has(type)){
				throw new Error('The specified data type has already been registered.');
			}
			this.types[type] = item;
        },

        unregister: function(type){
			if (!this.has(type)){
				throw new Error('The specified data type is not registered.');
			}
			delete this.types[type];
        },

        has: function(type){
			if (!this.types[type]){
				return;
			}
			return true;
        },

		find: function(source){
			var converter;
			for (var key in this.types) {
				converter = this.types[key];
                if (converter.match(source)) {
                	return converter;
                }
			}
			return false;
		},

        serialize: function(object){
            var name = typeOf(object);
            var converter = this.get(name);

            return converter.serialize(object);
        },

        deserialize: function(source){
			var converter, keywords;
			if (!(converter = this.find(source))){
				throw new Error('not match');
			}
			keywords = converter.compile(source);

			return converter.deserialize(keywords);
        }
    };

    Serializer.implement({
        serialize: function(object){
            return Container.serialize(object);
        },

        deserialize: function(source){
            return Container.deserialize(source);
        }
    });

    Object.append(Serializer, {

        register: function(type, converter){
            var key = typeOf(type.prototype);
            var converter = new Serializer.Converter(converter);
            Container.register(key, converter);
        },

        unregister: function(type){
            var key = typeOf(type.prototype);
            Container.unregister(key);
        }

    });


	var Converter = Serializer.Converter = function(converter){
		Object.append(this, converter || {});
    };

    Converter.implement({

		_expression: null,

    	_compileExpression: function(){
            var paturn = this.paturn;
            Object.each(this.params, function(token, keyword){
                paturn = paturn.replace(':' + keyword, '(\\' + token + ')');
            });
            paturn = paturn.replace('\:', ':');

			this._expression = new RegExp(paturn, 'i');

            return this._expression;
        },

        _parse: function(source){
			var attribs, result;

            attribs = source.match(this._compileExpression());
			if (attribs == false) {
				return;
			}
			attribs.shift();

			return attribs;
		},

		match: function(source){
			var expression = this._compileExpression();

            if (!expression.test(source)){
				return;
            }
			return true;
		},

        compile: function(source){
        	var result = this._parse(source);

            try {
                hash = result.associate(Object.keys(this.params));
            } catch(exp) {
                throw new Error('It failed in the compilation of the restoration pattern of deserialize.');
            }
            return hash;
        }

    });

}());
