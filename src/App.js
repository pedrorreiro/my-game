import GameProvider from "./contexts/GameProvider";
import ModalProvider from "./contexts/ModalProvider";
import Game from "./Game";

export default function App() {
    return (
        <ModalProvider>
            <GameProvider>
                <Game />
            </GameProvider>
        </ModalProvider>
    )
}