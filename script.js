const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const keywords = [
    { words: ["what is stimulus", "stimulus"], reply: "Stimulus is a consulting startup helping businesses grow." },
    { words: ["register", "signup"], reply: "You can register here: <a href='https://stimulus.org.in' target='_blank'>Registration Page</a>" },
    { words: ["contact", "email", "phone"], reply: "Email us at <a href='mailto:founder@stimulus.org.in'>founder@stimulus.org.in</a>" },
    { words: ["services", "offer"], reply: "We offer business consulting, recruitment, and advisory services." },
    { words: ["location", "where"], reply: "We are based in India." }
];

function addMessage(message, sender, isTemporary = false) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender === "user" ? "user-msg" : "bot-msg";
    msgDiv.innerHTML = message; 
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    if (isTemporary) {
        msgDiv.setAttribute("id", "temp-msg");
    }
}

function cleanInput(text) {
    return text.toLowerCase().replace(/[^\w\s]/gi, "").trim();
}

function findResponse(message) {
    for (let item of keywords) {
        for (let word of item.words) {
            if (message.includes(word)) {
                return item.reply;
            }
        }
    }
    return "Sorry, I don't understand.";
}

function handleUserMessage() {
    const rawMessage = userInput.value;
    const cleanedMessage = cleanInput(rawMessage);

    if (!cleanedMessage) return;

    addMessage(rawMessage, "user");
    userInput.value = "";

    addMessage("Bot is typing...", "bot", true);

    setTimeout(() => {
        document.getElementById("temp-msg").remove();
        const response = findResponse(cleanedMessage);
        addMessage(response, "bot");
    }, 1000); // delay to simulate thinking
}

sendBtn.addEventListener("click", handleUserMessage);
userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        handleUserMessage();
    }
});
