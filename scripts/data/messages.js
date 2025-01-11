// Function to get messages from localStorage or initialize with default messages
const getMessages = () => {
    let messages = [];

    // Try to load message data from localStorage
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
        messages = JSON.parse(storedMessages);
    } else {
        // If no data in localStorage, use default data
        const defaultMessages = ["Message 1", "Message 2"];
        messages = defaultMessages.map((msg, index) => {
            const otp = generateOTP(msg.length);
            return { id: index + 1, message: otpEncryptCipher(msg, otp), otp: otp };
        });
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    return messages;
}

// Function to insert a new message
const insertMessage = (newMessage) => {
    const messages = getMessages();
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Function to update a message
const updateMessage = (updatedMessage) => {
    const messages = getMessages();
    const messageIndex = messages.findIndex(message => message.id === updatedMessage.id);
    messages[messageIndex] = updatedMessage;
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Function to delete a message
const deleteMessage = (messageId) => {
    const messages = getMessages();
    const messageIndex = messages.findIndex(message => message.id === messageId);
    messages.splice(messageIndex, 1);
    localStorage.setItem('messages', JSON.stringify(messages));
}

const displayMessages = () => {
    const messages = getMessages();
    const messageContainer = document.querySelector('.message-container');
    messageContainer.innerHTML = messages.map(message => `
        <tr>
            <td>${message.id}</td>
            <td>${message.message}</td>
            <td>
                <button class="edit-button" data-id="${message.id}">Edit</button>
                <button class="delete-button" data-id="${message.id}">Delete</button>
            </td>
        </tr>
    `).join('');
}

displayMessages();