import React, { useState } from "react";
import axios from "axios";

function Chat() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            const res = await axios.post("http://localhost:5000/chat", { message });
            setResponse(res.data.choices[0].message.content);
        } catch (error) {
            console.error("Error:", error);
            setResponse("Error contacting the server.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Chat with Groq</h2>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                style={{ padding: "10px", width: "300px", marginRight: "10px" }}
            />
            <button onClick={sendMessage} style={{ padding: "10px" }}>Send</button>
            <p><strong>Response:</strong> {response}</p>
        </div>
    );
}

export default Chat;


