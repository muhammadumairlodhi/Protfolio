const chatInput = document.querySelector(".chat-input textarea")


const sendChatBtn = document.querySelector(".chat-input span")

const chatbox = document.querySelector(".chatbox")

const chatToggler = document.querySelector(".chat-toggler");

const chatbotclosebtn = document.querySelector(".closebtn");



let userMessage;
const API_KEY ="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";

const createChatLi = (message, className) => {
const chatLi = document.createElement("li");
chatLi.classList.add("chat", className);
let chatContent = className === "outgoing"? `<p></p>` :  `<span class="material-symbols-outlined">smart_toy</span> <p></p>`;
chatLi.innerHTML = chatContent;
chatLi.querySelector("p").textContent = message;
return chatLi;
}

const generateResponse = (incomingChatLi) => {
const API_URL = "https://api.openai.com/v1/chat/completions";
const messageElement = incomingChatLi.querySelector("p")

const requestOption = {
    method: "POST",
    headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${API_KEY}`
    },
    body: JSON.stringify({
        model:"gpt-3.5-turbo",
        messages:[{role: "user", content: userMessage}]
     })
}
fetch(API_URL, requestOption).then(res => res.json()).then(data =>{
    messageElement.textContent = data.choices[0].message.content;
}).catch((error) => {
    messageElement.classList.add("error");
    messageElement.textContent = "sorry Umair is Busy. Please try again";
    
})
}

const handleChat = () =>{
    userMessage = chatInput.value.trim();
    if(!userMessage)return;
    chatInput.value="";

// append the user message to chat
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    setTimeout(() => {

        const incomingChatLi = createChatLi("Connecting with Umair....", "incoming")
        chatbox.appendChild(incomingChatLi);     
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("keyup",(e)=>{
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 400){
        e.preventDefault();
        handleChat();
    }
})

sendChatBtn.addEventListener("click", handleChat)

