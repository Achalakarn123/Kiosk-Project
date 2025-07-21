// Chatbot knowledge base (modify as needed)
const chatbotKnowledge = {
  "greeting": ["Hello! I'm SaladBot. How can I help with your salad order today? 🥗", "Hi there! Ready to make some delicious salad choices?"],
  "menu": ["We have **veg** (₹169-229) and **non-veg** (₹269-299) salads. Click **'Start Order'** to browse!", "Check out our menu for fresh veg and non-veg options!"],
  "ingredients": ["All ingredients are fresh and locally sourced! Ask about a specific salad for details.", "We use farm-fresh veggies, premium proteins, and homemade dressings."],
  "allergy": ["Common allergens: nuts, dairy (cheese), gluten (croutons). We can customize!", "Let us know about allergies—we’ll adjust your salad!"],
  "hours": ["Open daily: **10AM - 10PM**", "Come visit us from 10 in the morning until 10 at night!"],
  "delivery": ["We only offer **in-kiosk ordering** for now.", "Place your order here and pick it up at the counter!"],
  "cart": ["Taking you to your cart...", "Let’s check your order!"],
  "default": ["I’m not sure about that. Try asking about:\n- **Menu**\n- **Ingredients**\n- **Allergies**\n- **Hours**", "Hmm... ask me about salads, ingredients, or store hours!"]
};

// Chatbot UI interaction
document.addEventListener('DOMContentLoaded', () => {
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatInput = document.getElementById('chatbot-input');
  const chatMessages = document.getElementById('chatbot-messages');

  // Toggle chatbot visibility
  chatbotToggle.addEventListener('click', () => {
    chatbotContainer.style.display = chatbotContainer.style.display === 'none' ? 'block' : 'none';
  });

  // Handle user input
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
      const userMessage = chatInput.value.trim();
      chatInput.value = '';
      addMessage(userMessage, 'user');
      
      // Simulate "typing" delay
      setTimeout(() => {
        const botResponse = generateResponse(userMessage);
        addMessage(botResponse, 'bot');
      }, 500);
    }
  });

  // Generate bot response (rule-based)
  function generateResponse(input) {
    input = input.toLowerCase();
    
    // Check for specific commands
    if (input.includes('cart') || input.includes('order')) {
      setTimeout(() => window.location.href = 'cart.html', 1000);
      return randomResponse("cart");
    }
    if (input.includes('menu') || input.includes('salad')) {
      setTimeout(() => window.location.href = 'menu.html', 1000);
      return randomResponse("menu");
    }
    if (input.includes('hi') || input.includes('hello')) return randomResponse("greeting");
    if (input.includes('ingredient')) return randomResponse("ingredients");
    if (input.includes('allerg')) return randomResponse("allergy");
    if (input.includes('hour') || input.includes('open')) return randomResponse("hours");
    if (input.includes('deliver')) return randomResponse("delivery");
    
    return randomResponse("default");
  }

  // Helper: Pick a random response from knowledge base
  function randomResponse(type) {
    const responses = chatbotKnowledge[type] || chatbotKnowledge["default"];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Helper: Add message to chat UI
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});