import React, { createContext, useState } from "react";
import { LEVELS } from "../utils/constraints";

export const GameContext = createContext("game")

export default function GameProvider({ children }) {
    const [playing, setPlaying] = useState(false);
    const [loadingPlay, setLoadingPlay] = useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [lives, setLives] = useState(0);
    const [points, setPoints] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(1);

    const fillLives = () => {
        setLives(LEVELS[currentLevel].lives);
    }

    return (
        <GameContext.Provider value={{
            playing,
            setPlaying,
            loadingPlay,
            setLoadingPlay,
            cards,
            setLives,
            lives,
            setCards,
            selectedCard,
            setSelectedCard,
            points,
            setPoints,
            fillLives,
            currentLevel,
            setCurrentLevel
        }}>
            {children}
        </GameContext.Provider>
    )
}