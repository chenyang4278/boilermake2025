import React, { useState } from "react";
import axios from "axios";

function AITutor() {
    const [topic, setTopic] = useState("");
    const [question, setQuestion] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [waitingForAnswer, setWaitingForAnswer] = useState(false);

    const startTutor = async () => {
        if (!topic.trim()) return;
        setFeedback("");
        setUserAnswer("");
        setWaitingForAnswer(false);

        try {
            const res = await axios.post("http://localhost:5000/generate-question", { topic });
            setQuestion(res.data.question);
            setWaitingForAnswer(true);
        } catch (error) {
            console.error("Error:", error);
            setFeedback("Failed to generate a question. Try again!");
        }
    };

    const checkAnswer = async () => {
        if (!userAnswer.trim()) return;

        try {
            const res = await axios.post("http://localhost:5000/check-answer", { question, userAnswer });
            setFeedback(res.data.feedback);

            // If correct, move to the next question
            if (res.data.correct) {
                setTimeout(() => {
                    startTutor();
                }, 2000);
            }
        } catch (error) {
            console.error("Error:", error);
            setFeedback("Error checking your answer.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>AI-Powered Study Tutor</h2>

            {!waitingForAnswer ? (
                <>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter a topic..."
                        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
                    />
                    <button onClick={startTutor} style={{ padding: "10px" }}>Start</button>
                </>
            ) : (
                <>
                    <p><strong>Question:</strong> {question}</p>
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Your answer..."
                        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
                    />
                    <button onClick={checkAnswer} style={{ padding: "10px" }}>Submit</button>
                </>
            )}

            {feedback && <p><strong>Feedback:</strong> {feedback}</p>}
        </div>
    );
}

export default AITutor;
