import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Welcome to Your Study App</h1>
            <button onClick={() => navigate("/flashcards")} style={{ padding: "10px", margin: "10px" }}>
                📚 Flashcards
            </button>
            <button onClick={() => navigate("/ai-tutor")} style={{ padding: "10px", margin: "10px" }}>
                🎓 AI Tutor
            </button>
        </div>
    );
}

export default Home;
