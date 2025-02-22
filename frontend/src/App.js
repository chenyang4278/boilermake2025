import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Flashcards from "./Flashcards";
import AITutor from "./AITutor";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/ai-tutor" element={<AITutor />} />
            </Routes>
        </Router>
    );
}

export default App;
