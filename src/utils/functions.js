import { cardImages } from "./constraints";

export const waitSeconds = (seconds) => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export const createCards = (cards) => {

    if (cards % 2 !== 0) {
        throw new Error('O número de cartas deve ser par');
    }

    if (cards > cardImages.length * 2) {
        throw new Error('O número de cartas é maior que o número de imagens');
    }

    const cardsArray = [];

    for (let i = 0; i < cards; i++) {

        const newCard = {
            id: cardsArray.length + 1,
            image: cardImages[i],
            isFlipped: false,
        }

        const clone = { ...newCard, id: newCard.id + 1 };

        cardsArray.push(newCard);
        cardsArray.push(clone);

        if (cardsArray.length === cards) break;
    }

    cardsArray.sort(() => Math.random() - 0.5);

    return cardsArray;
}