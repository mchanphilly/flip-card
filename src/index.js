class FlipCard extends HTMLElement {
    #side;

    constructor() {
        super();
        let side = this.getAttribute("side");
        this.#side = (side === null) ? 0: side;

        console.log(`Constructed card with side ${this.#side}`);
    }

    get side() {
        return this.#side;
    }

    flip() {
        this.#side = 1 - this.#side;
        console.log(`Flipped to ${this.#side}`);
    }


}

customElements.define("flip-card", FlipCard);

console.log(card);
card.flip();
card.flip();