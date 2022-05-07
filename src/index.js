class FlipCard extends HTMLElement {
    #side;

    constructor() {
        super();
        let side = this.getAttribute("side");
        this.#side = (side === null) ? 0: side;

        this.children[1 - this.#side].setAttribute("hidden", "");
        console.log(`Constructed card with side ${this.#side}`);

        this.addEventListener("click", (e) => {
            this.flip();
        })
    }

    get side() {
        return this.#side;
    }

    set side(s) {
        if (this.#side != s) this.flip();
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
        children[back].setAttribute("hidden", "")
        children[front].removeAttribute("hidden");
    }
}

customElements.define("flip-card", FlipCard);

console.log(card);
card.flip();
card.flip();