const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const name = prompt("what is your Name");
appendMessage(`You Joined ${name}`);

socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}:${data.message}`);
});
socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});
socket.on("disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let message = messageInput.value;
  appendMessage(`You : ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  messageContainer.append(messageElement);
}
