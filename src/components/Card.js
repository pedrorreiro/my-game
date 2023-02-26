import { useContext } from "react";
import { GameContext } from "../contexts/GameProvider";
import { ModalContext } from "../contexts/ModalProvider";
import { LEVELS } from "../utils/constraints";
import { waitSeconds } from "../utils/functions";

export default function Card({ card }) {

    const { playing,
        setPlaying,
        loadingPlay,
        setLoadingPlay,
        cards,
        setCards,
        selectedCard,
        setSelectedCard,
        points,
        lives,
        setLives,
        setPoints,
        setCurrentLevel,
        currentLevel,

    } = useContext(GameContext);

    const { showModal } = useContext(ModalContext);


    const gameOver = () => {
        hideAll();
        setPlaying(false);
        setPoints(0);
        setLives(0);
        setSelectedCard(null);
        showModal({
            title: 'Game Over',
            text: 'Você perdeu todas as vidas. Tente novamente!',
        }, false)
        setCurrentLevel(1);
    }

    const winAll = () => {
        hideAll();
        setPlaying(false);
        showModal({
            title: 'Parabéns!',
            text: 'Você ganhou todas as fases!',
        }, false)
        setCurrentLevel(1);
    }

    const showWithImage = (image) => {
        cards.forEach(card => {
            if (card.image === image) {
                card.isFlipped = true;
            }
        });
        setCards([...cards]);
    }

    const hideAll = () => {
        cards.forEach(card => {
            card.isFlipped = false;
        });
        setCards([...cards]);
    }

    const hideBoth = (id1, id2) => {
        cards.forEach(card => {
            if (card.id === id1 || card.id === id2) {
                card.isFlipped = false;
            }
        });
        setCards([...cards]);
    }

    const flip = async () => {

        if (loadingPlay) return;

        if (!playing) return;

        const currentCard = cards.find(c => c.id === card.id);

        if (currentCard.isFlipped) return;

        setSelectedCard(
            currentCard
        );

        if (selectedCard !== null) {  // Se já houver uma carta selecionada, a jogada está em análise. Não pode clicar em outra carta.
            setLoadingPlay(true);
        }

        cards.forEach(async c => {
            if (c.id === card.id) {
                c.isFlipped = true;

                if (selectedCard !== null) {

                    await waitSeconds(1);

                    if (selectedCard.image === currentCard.image) {
                        showWithImage(currentCard.image);
                        setSelectedCard(null);
                        setPoints(points + 1);

                        setLoadingPlay(false);

                        if (points === LEVELS[currentLevel].cards / 2 - 1) {
                            alert('Parabéns, você ganhou!');
                            setPlaying(false);
                            setPoints(0);
                            if (currentLevel === Object.keys(LEVELS).length) {
                                winAll();
                                return;
                            }
                            setCurrentLevel(currentLevel + 1);


                        }
                    }
                    else {
                        hideBoth(currentCard.id, selectedCard.id);
                        setSelectedCard(null);
                        setLives(lives - 1);
                        if (lives - 1 === 0) {
                            gameOver();
                        }
                        setLoadingPlay(false);
                    }
                }
            }
        });



        setCards([...cards]);

    }

    return (
        <div className={`card ${card.isFlipped ? 'flip' : 'not-flip'} ${card.score ? 'score' : ''} ${loadingPlay ? 'blocked' : 'allowed'}`} onClick={flip}>
            <div className={`face front`}>?</div>
            <div className={`face back `} >
                {card.isFlipped && <img src={card.image} alt="carta" />}
            </div>
        </div>
    );
}