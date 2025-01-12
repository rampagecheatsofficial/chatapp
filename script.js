let username = '';
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const setUsernameButton = document.getElementById('set-username-button');
const usernameInput = document.getElementById('username-input');
const usernameSection = document.getElementById('username-section');
const chatSection = document.getElementById('chat-section');

// Connect to the WebSocket server using socket.io-client
const socket = io('http://localhost:3000');

// Function to set username
function setUsername() {
  const enteredUsername = usernameInput.value.trim();
  
  if (enteredUsername) {
    username = enteredUsername;
    usernameSection.style.display = 'none';
    chatSection.style.display = 'flex';
  } else {
    alert('Please enter a valid username.');
  }
}

// Function to send a message
function sendMessage() {
  const messageText = messageInput.value.trim();
  
  if (messageText !== '') {
    // Get the current timestamp
    const timestamp = new Date().toLocaleTimeString();

    // Emit the message to the server
    socket.emit('chat message', {
      username: username,
      message: messageText,
      timestamp: timestamp
    });
    
    // Clear the input field
    messageInput.value = '';
  }
}

// Listen for incoming messages from the server
socket.on('chat message', (data) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  
  // Create message structure
  messageElement.innerHTML = `
    <div class="username">${data.username}</div>
    <div class="timestamp">${data.timestamp}</div>
    <div class="content">${data.message}</div>
  `;
  
  // Append the new message to the chat box
  chatBox.appendChild(messageElement);
  
  // Scroll to the latest message
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Event listener for setting the username
setUsernameButton.addEventListener('click', setUsername);

// Event listener for the send button
sendButton.addEventListener('click', sendMessage);

// Optional: Send message when 'Enter' key is pressed
messageInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
