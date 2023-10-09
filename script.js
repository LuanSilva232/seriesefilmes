let isScreenSharing = false;
let screenStream;
let videoElement;
let canDeleteMessages = false;

const userNameInput = document.getElementById('user-name-input');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const settingsButton = document.getElementById('settings-button');
const deleteButton = document.getElementById('delete-button');
const settingsPopup = document.getElementById('settings-popup');
const deletePermissionCheckbox = document.getElementById('delete-permission');

const savedUserName = localStorage.getItem('userName');
if (savedUserName) {
    userNameInput.value = savedUserName;
}

chatInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

const sendMessageButton = document.createElement('button');
sendMessageButton.innerText = 'Enviar';
sendMessageButton.addEventListener('click', sendMessage);
chatInput.parentNode.appendChild(sendMessageButton);

function sendMessage() {
    const message = chatInput.value;
    const senderName = userNameInput.value || 'Você';
    if (message.trim() !== '') {
        addMessageToChat(senderName, message);
        chatInput.value = '';
        saveMessages();
    }
}

function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    const deleteButtonHTML = canDeleteMessages ? `<span class="delete-button" onclick="deleteMessage(this)">❌</span>` : '';
    messageElement.className = 'chat-message';
    messageElement.innerHTML = `<strong>${sender}:</strong> <span>${message}</span> ${deleteButtonHTML}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function deleteMessage(deleteButton) {
    if (canDeleteMessages) {
        const messageElement = deleteButton.parentNode;
        messageElement.parentNode.removeChild(messageElement);
        saveMessages();
    }
}

