import React, { useState, useEffect } from "react";
//testing vs code saves correctly
function Flashcards() {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");

    // Load flashcards from local storage when the component mounts
    useEffect(() => {
        const savedFlashcards = JSON.parse(localStorage.getItem("flashcards"));
        if (savedFlashcards) {
            setFlashcards(savedFlashcards);
        }
    }, []);

    // Save flashcards to local storage whenever they change
    useEffect(() => {
        localStorage.setItem("flashcards", JSON.stringify(flashcards));
    }, [flashcards]);

    const addFlashcard = () => {
        if (newQuestion.trim() === "" || newAnswer.trim() === "") return;
        const newCard = { question: newQuestion, answer: newAnswer };
        setFlashcards([...flashcards, newCard]);
        setNewQuestion("");
        setNewAnswer("");
    };

    const nextCard = () => {
        setFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Flashcards</h2>

            {flashcards.length > 0 ? (
                <div 
                    onClick={() => setFlipped(!flipped)}
                    style={{
                        border: "1px solid black",
                        padding: "20px",
                        width: "300px",
                        margin: "0 auto",
                        cursor: "pointer",
                        fontSize: "18px",
                        backgroundColor: flipped ? "#f8d7da" : "#d1ecf1"
                    }}
                >
                    {flipped ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
                </div>
            ) : (
                <p>No flashcards yet. Add some below!</p>
            )}

            <br />
            {flashcards.length > 0 && <button onClick={nextCard} style={{ padding: "10px" }}>Next Card</button>}

            <h3>Add a New Flashcard</h3>
            <input
                type="text"
                placeholder="Enter question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                style={{ padding: "5px", margin: "5px" }}
            />
            <input
                type="text"
                placeholder="Enter answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                style={{ padding: "5px", margin: "5px" }}
            />
            <button onClick={addFlashcard} style={{ padding: "5px" }}>Add Flashcard</button>
        </div>
    );
}

export default Flashcards;

