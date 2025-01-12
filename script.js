let username = '';
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const setUsernameButton = document.getElementById('set-username-button');
const usernameInput = document.getElementById('username-input');
const usernameSection = document.getElementById('username-section');
const chatSection = document.getElementById('chat-section');

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
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    // Get the current timestamp
    const timestamp = new Date().toLocaleTimeString();

    // Create message structure
    messageElement.innerHTML = `
      <div class="username">${username}</div>
      <div class="timestamp">${timestamp}</div>
      <div class="content">${messageText}</div>
    `;
    
    // Append the message to the chat box
    chatBox.appendChild(messageElement);
    
    // Clear the input field
    messageInput.value = '';
    
    // Scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
  }
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
