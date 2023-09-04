document.addEventListener("DOMContentLoaded", function() {
    const nicknameForm = document.getElementById("nickname-form");
    const nicknameInput = document.getElementById("nickname");
    const chatSection = document.getElementById("chat");
    const nicknameSection = document.getElementById("nickname-entry");

    // Check if the nickname is already set in local storage
    const isNicknameSet = localStorage.getItem("isNicknameSet");

    if (isNicknameSet) {
        // If the nickname is set, hide the nickname entry section and show the chat section
        nicknameSection.style.display = "none";
        chatSection.style.display = "block";
    } else {
        // If the nickname is not set, show the nickname entry section and hide the chat section
        nicknameSection.style.display = "block";
        chatSection.style.display = "none";
    }

    // Handle nickname form submission
    nicknameForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const nickname = nicknameInput.value.trim();
        if (nickname) {
            // Save the nickname to local storage
            localStorage.setItem("nickname", nickname);
            localStorage.setItem("isNicknameSet", true);
            // Hide the nickname entry section and show the chat section
            nicknameSection.style.display = "none";
            chatSection.style.display = "block";
        }
    });

    const updateList = document.getElementById("update-list");
    const updateInput = document.getElementById("update-input");
    const updateButton = document.getElementById("update-button");

    // Function to add a new message
    function addMessage(text, name) {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.textContent = `${name}: ${text}`;
        updateList.appendChild(messageDiv);
    }

    // Handle the "Send" button click
    updateButton.addEventListener("click", function(e) {
        e.preventDefault();
        const updateText = updateInput.value;
        const nickname = localStorage.getItem("nickname");
        if (updateText.trim() !== "") {
            addMessage(updateText, nickname);
            updateInput.value = "";

            // Scroll to the latest message
            updateList.scrollTop = updateList.scrollHeight;

            // Save messages to local storage
            const messages = JSON.parse(localStorage.getItem("messages")) || [];
            messages.push({ name: nickname, text: updateText });
            localStorage.setItem("messages", JSON.stringify(messages));
        }
    });

    // Load chat messages from local storage
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        for (let i = 0; i < messages.length; i++) {
            addMessage(messages[i].text, messages[i].name);
        }
    }

    // Initial load of chat messages
    loadMessages();
});
