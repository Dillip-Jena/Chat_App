
function setConnected(connected){
  document.getElementById('sendMessage').disabled = !connected;
}

function connect(){
  var socket = new SockJS('/chat');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function(frame){
    setConnected(true);
    stompClient.subscribe('/topic/messages', function (message){
      showMessage(JSON.parse(message.body));
    });
  });
}

function showMessage(message){
  var chat = document.getElementById('chat');
  var messageElement = document.createElement('div');
  messageElement.textContent = message.sender + ' : ' + message.content;
  messageElement.class = "border-bottom mb-1";
  chat.appendChild(messageElement)
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage(){
  var sender = document.getElementById('senderInput').value;
  var content = document.getElementById('messageInput').value;
  var chatMessage = {
    sender: sender,
    content: content
  }
  stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
  document.getElementById('messageInput').value= '';
}

document.getElementById('sendMessage').onclick = sendMessage;
window.onload = connect;