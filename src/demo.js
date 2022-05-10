import "flip-card/src/FlipCard.js";

// JavaScript Demo
let button = document.querySelector("#javascript-demo button");
button.addEventListener("click", (e) => {
    e.preventDefault();
    let card = document.querySelector("#button-card");
    card.flip();
})

// Chaining Demo
let cards = document.querySelectorAll("#chaining-demo flip-card");
console.log(cards);
cards[0].addEventListener("flip", (e) => {
    cards[1].flip();
})

cards[1].addEventListener("flip", (e) => {
    cards[2].flip();
})