document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const emojiButton = document.getElementById('emojiButton');
    const emojiPicker = document.getElementById('emojiPicker');
    
    // Sample bot responses
    const botResponses = [
        "Hello there! How can I help you?",
        "That's interesting! Tell me more.",
        "I'm just a simple chat bot, but I'm happy to chat!",
        "Have you tried turning it off and on again?",
        "The weather is nice today, isn't it?",
        "I'm sorry, I didn't understand that. Could you rephrase?",
        "Thanks for sharing that with me!",
        "What else would you like to talk about?"
    ];
    
    // Initialize the chat
    function init() {
        setupEventListeners();
    }
    
    // Set up event listeners
    function setupEventListeners() {
        sendButton.addEventListener('click', sendMessage);
        
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        emojiButton.addEventListener('click', toggleEmojiPicker);
        
        // Add emoji click handlers
        const emojis = emojiPicker.querySelectorAll('.emoji-container span');
        emojis.forEach(emoji => {
            emoji.addEventListener('click', function() {
                messageInput.value += this.textContent;
                messageInput.focus();
            });
        });
        
        // Close emoji picker when clicking outside
        document.addEventListener('click', function(e) {
            if (!emojiPicker.contains(e.target) && e.target !== emojiButton) {
                emojiPicker.style.display = 'none';
            }
        });
    }
    
    // Send a message
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            addMessage(messageText, 'sent');
            messageInput.value = '';
            
            // Simulate bot response after a short delay
            setTimeout(() => {
                const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                addMessage(randomResponse, 'received');
            }, 1000 + Math.random() * 2000);
        }
    }
    
    // Add a message to the chat
    function addMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageElement.innerHTML = `
            <div class="message-text">${text}</div>
            <div class="message-time">${timeString}</div>
        `;
        
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }
    
    // Scroll to the bottom of the chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Toggle emoji picker visibility
    function toggleEmojiPicker(e) {
        e.stopPropagation();
        emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block';
    }
    
    // Initialize the chat
    init();
});