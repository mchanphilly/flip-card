class FlipCard extends HTMLElement {
    #side;

    constructor() {
        super();
        let side = this.getAttribute("side");
        this.#side = (side === null) ? 0: side;

        this.children[1 - this.#side].setAttribute("hidden", "");
        console.log(`Constructed card with side ${this.#side}`);
    }

    get side() {
        return this.#side;
    }

    set side(s) {
        this.#side = s;
        this.setAttribute("side", s);
    }

    static get observedAttributes() {
        return ["side"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "side") this.#side = newValue;
    }

    flip() {
        let back = this.#side;
        let front = this.#side = 1 - this.#side;
        console.log(`Flipped to ${this.#side}`);

        let children = this.children;

        this.setAttribute("side", front);
        children[back].setAttribute("hidden", "");
        children[front].removeAttribute("hidden");
    }


    // #getFront() {
    //     return this.children[0];
    // }

    // #getBack() {
    //     return this.children[1];
    // }


}

customElements.define("flip-card", FlipCard);

console.log(card);
card.flip();
card.flip();