Change log
============================

1. Template paturn

Blankets

{key},{key2} -> {$key1}, {$key2}

left => {$
right => }

Serializer.setOptions({

	tagLeft: '{$',
	tagRight: '}'

});

paturn
-> {$key},{$key2}
-> {¥$key},{¥$key2}
-> ¥{¥$key¥},¥{¥$key2¥}

{$.+}