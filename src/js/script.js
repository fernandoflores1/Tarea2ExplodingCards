import { Card } from "./classes.js";
import {
    bodyElement, MAX_BOMB_NUMBER, MAX_DEFUSE_NUMBER, MAX_NOPE_NUMBER, MAX_POINT_NUMBER, MAX_SKIP_TURN_NUMBER, MIN_POINT_VALUE, MAX_POINT_VALUE
} from "./consts.js";

bodyElement.classList.add("nunito")

const divElement = document.createElement("div");
divElement.setAttribute("id", "container");

const mainElement = document.createElement("main");

const drawButtonElement = document.createElement("button");
drawButtonElement.textContent = "Draw"


const restartButtonElement = document.createElement("button");
restartButtonElement.textContent = "Restart"


const divUp = document.createElement("div");
divUp.setAttribute("id", "up");

const imgUp = document.createElement("img");

const divTypeAndDescription = document.createElement("div");
divTypeAndDescription.setAttribute("id", "typeDescription");

const h2ElementUp = document.createElement("h2");
const descriptionElementUp = document.createElement("p");

const imgElement = document.createElement("img");
const pElement = document.createElement("p");
pElement.classList.add("points")

const divDown = document.createElement("div");
divDown.setAttribute("id", "down");

const imgDown = document.createElement("img");
const divTypeAndDescriptionDown = document.createElement("div");
divTypeAndDescriptionDown.setAttribute("id", "typeDescriptionDown")
const h2ElementDown = document.createElement("h2");
const descriptionElementDown = document.createElement("p");



let cardsArray = [];

bodyElement.append(divElement);
drawHTML(drawButtonElement);

makeCards();
fisherYatesShuffle(cardsArray);

console.log(cardsArray);

drawButtonElement.addEventListener("click", () => {
    if (cardsArray.length > 0) {
        let lastCard = cardsArray.pop();

        mainElement.className = lastCard.className;

        h2ElementUp.textContent = lastCard.type;
        h2ElementDown.textContent = lastCard.type;
        imgUp.setAttribute("src", lastCard.icon);
        imgElement.setAttribute("src", lastCard.icon);
        imgDown.setAttribute("src", lastCard.icon);
        descriptionElementUp.textContent = lastCard.description;
        descriptionElementDown.textContent = lastCard.description;

        if (lastCard.type === "Points") {
            pElement.textContent = lastCard.value;
        } else {
            pElement.textContent = "";
        }
    } else {
        imgUp.removeAttribute("src")
        imgDown.removeAttribute("src")
        imgElement.removeAttribute("src")
        imgUp.setAttribute("src", "src/images/withoutCards.jpg");
        imgElement.setAttribute("src", "src/images/withoutCards.jpg");
        imgDown.setAttribute("src", "src/images/withoutCards.jpg");
        h2ElementUp.textContent = "No more cards";
        h2ElementDown.textContent = "No more cards";
        mainElement.removeChild(imgElement);
        descriptionElementUp.textContent = "";
        descriptionElementDown.textContent = "";
        pElement.textContent = "";

        deleteHTML(drawButtonElement);
        drawHTML(restartButtonElement);
    }
});

restartButtonElement.addEventListener("click", () => {
    cardsArray = [];
    makeCards();
    fisherYatesShuffle(cardsArray);


    h2ElementUp.textContent = "";
    h2ElementDown.textContent = "";
    imgUp.setAttribute("src", "src/images/withoutCards.jpg");
    imgElement.setAttribute("src", "src/images/withoutCards.jpg");
    imgDown.setAttribute("src", "src/images/withoutCards.jpg");
    descriptionElementUp.textContent = "";
    descriptionElementDown.textContent = "";
    pElement.textContent = "";

    
    deleteHTML(restartButtonElement);
    drawHTML(drawButtonElement);
});

function makeCards() {
    let newCard;
    for (var i = 0; i < MAX_BOMB_NUMBER; i++) {
        newCard = new Card("Bomb", "If you draw one and don't have a Defuse card, you lose", "src/images/bomb.png");
        newCard.className = "card-bomb";
        cardsArray.push(newCard);
    }

    for (var i = 0; i < MAX_DEFUSE_NUMBER; i++) {
        newCard = new Card("Defuse", "You can keep all the ones you draw in your hand", "src/images/defuse.png");
        newCard.className = "card-defuse";
        cardsArray.push(newCard);
    }

    for (var i = 0; i < MAX_SKIP_TURN_NUMBER; i++) {
        newCard = new Card("Skip turn", "They allow you to avoid drawing a card when you want", "src/images/skipTurn.png");
        newCard.className = "card-skip";
        cardsArray.push(newCard);
    }

    for (var i = 0; i < MAX_NOPE_NUMBER; i++) {
        newCard = new Card("Nope", "If an opponent wants to skip a turn, you can cancel it using this card; both are discarded", "src/images/nope.png");
        newCard.className = "card-nope";
        cardsArray.push(newCard);
    }

    for (var i = 0; i < MAX_POINT_NUMBER; i++) {
        newCard = new Card("Points", "When generated, they can have a random value between 1 and 10. If the game ends and more than one player is alive, the one with the most points wins.", "src/images/point.png", randomNumber());
        newCard.className = "card-points";
        cardsArray.push(newCard);
    }
}

function randomNumber() {
    return Math.floor(Math.random() * MAX_POINT_VALUE) + MIN_POINT_VALUE;
}

function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function drawHTML(buttonElement) {
    divElement.append(buttonElement);
    divElement.append(mainElement);
    mainElement.append(divUp);
    divUp.append(imgUp);
    divUp.append(divTypeAndDescription);
    divTypeAndDescription.append(h2ElementUp);
    divTypeAndDescription.append(descriptionElementUp);
    mainElement.append(imgElement);
    mainElement.append(pElement);
    mainElement.append(divDown);
    divDown.append(imgDown);
    divDown.append(divTypeAndDescriptionDown);
    divTypeAndDescriptionDown.append(h2ElementDown);
    divTypeAndDescriptionDown.append(descriptionElementDown);
}

function deleteHTML(buttonElement) {
    divElement.removeChild(buttonElement);
}