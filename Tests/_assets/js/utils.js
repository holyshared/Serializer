(function(win, doc){

this.addMessage = function addMessage(text){
    var container = doc.getElementById('messages');

    var message = doc.createElement('p');
    var messageText = doc.createTextNode(text);

    message.appendChild(messageText);
    container.appendChild(message);
}
	
}(window, document));
