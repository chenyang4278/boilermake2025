const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";


// Route to generate a question based on a topic
app.post("/generate-question", async (req, res) => {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ error: "Topic is required." });
    }

    const prompt = `Generate a study question about ${topic}.`;

    try {
        const response = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{ role: "system", content: prompt }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Groq API Error:", errorText);
            return res.status(500).json({ error: "Failed to generate question.", details: errorText });
        }

        const data = await response.json();
        const question = data.choices?.[0]?.message?.content?.trim() || "Couldn't generate a question.";

        res.json({ question });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error when generating question." });
    }
});


// Route to check the user's answer
app.post("/check-answer", async (req, res) => {
    const { question, userAnswer } = req.body;

    if (!question || !userAnswer) {
        return res.status(400).json({ error: "Both question and user answer are required." });
    }

    const prompt = `Question: ${question}\nUser's Answer: ${userAnswer}\nIs this correct? Answer 'yes' or 'no' and explain briefly.`;

    try {
        const response = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{ role: "system", content: prompt }]
            })
        });

        const data = await response.json();
        const feedback = data.choices[0]?.message?.content.trim() || "Couldn't check the answer.";

        const correct = feedback.toLowerCase().includes("yes");

        res.json({ feedback, correct });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to check answer." });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
