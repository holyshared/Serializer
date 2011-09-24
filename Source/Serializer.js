/*
---
name: Serializer

description: The object of the defined type is restored from the character string and the character string to the object with Type. 

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Type
  - Core/String
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
				throw new Error('It is not possible to convert it into the object.');
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

		_variableStart: '{',
		_variableEnd: '}',

		setVariableRule: function(rule){
			if (!rule.start || !rule.end){
				throw new TypeError('Option specification is not carried out.');
			}
			this._variableStart = this._validateRule(rule.start);
			this._variableEnd = this._validateRule(rule.end);
			return this;
		},

		getVariableRule: function(){
			var rule = {
				start: this._variableStart,
				end: this._variableEnd
			};
			return rule;
		},

		_validateRule: function(bracket){
			if (!Type.isString(bracket)){
				throw new TypeError('It is invalid variable rule');
			}
			return bracket;
		},

		register: function(type, converter){
			var key = typeOf(type.prototype);
			var converter = new Serializer.Converter(converter);
			Container.register(key, converter);
			return Serializer;
		},

		unregister: function(type){
			var key = typeOf(type.prototype);
			Container.unregister(key);
			return Serializer;
		}

	});


	var Variable = Serializer.Variable = {

		parsePaturn: function(paturn, params){
			var variables = {};

			Object.each(params, function(token, keyword){
				variables[keyword] = '(' + token + ')';
			});

			var expression = Variable.variablePaturn();
			paturn = paturn.substitute(variables, expression);

			return new RegExp(paturn);
		},

		variablePaturn: function(){
			var rule = Serializer.getVariableRule();
			var start = rule.start, end = rule.end;
			var paturn = '\\\\?\\' + start + '([^' + start + end + ']+)\\' + end;
			var re = new RegExp(paturn, 'g');
			return re;
		}
		
	};


	var Converter = Serializer.Converter = function(converter){
		Object.append(this, converter || {});
	};

	Converter.implement({

		_compiledParser: null,
		_compiledVariable: null,

		_compileParser: function(){
			if (this._compiledParser){
				return this._compiledParser;
			}
			this._compiledParser = Variable.parsePaturn(this.paturn, this.params);
			return this._compiledParser;
		},

		_compileVariable: function(){
			if (this._compiledVariable){
				return this._compiledVariable;
			}
			this._compiledVariable = Variable.variablePaturn();
			return this._compiledVariable;
		},

		_parse: function(source){
			var attribs, result;
			var expression = this._compileParser();

			attribs = source.match(expression);

			if (attribs == false) {
				return;
			}
			attribs.shift();

			return attribs;
		},

		assemble: function(params){
			var expression = this._compileVariable();
			return this.paturn.substitute(params, expression);
		},

		match: function(source){
			var expression = this._compileParser();

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
