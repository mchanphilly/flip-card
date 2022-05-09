class FlipCard extends HTMLElement {
    #side;

    constructor() {
        super();
        let side = this.getAttribute("side");
        this.#side = (side === null) ? 0: side;

        // this.children[1 - this.#side].setAttribute("hidden", "");
        console.log(`Constructed card with side ${this.#side}`);

        this.addEventListener("click", (e) => {
            this.flip();
        })

        this.attachShadow({mode: "open"});

        // Frame of the animation
        const frame = document.createElement("article");
        frame.id = "frame";

        // The actual movable object inside this flip-card frame
        const movable = document.createElement("article");
        movable.id = "movable";

        const fallback = '<div>Slot error</div>';

        // Construct the faces
        for (let i = 0; i < 2; i++) {
            const face = document.createElement("section")
            face.classList.add("face");

            const slot = document.createElement("slot");
            slot.name = i;
            slot.innerHTML = fallback;

            this.children[i].setAttribute("slot", i);

            face.appendChild(slot);

            // face.appendChild(this.children[0]);  // 0 because the list mutates; so this is like a pop.
            movable.appendChild(face);
        }

        frame.appendChild(movable);
        this.shadowRoot.appendChild(frame);
        this.shadowRoot.innerHTML +=
        `<style>
            :host #frame {
                width: fit-content;
                height: fit-content;
                perspective: 600px;
            }

            :host #movable {
                display: block;
                transition: transform 700ms;
                transform-style: preserve-3d;
                cursor: pointer;
            }

            :host .face {
                display: block;
                width: 100%;
                height: 100%;
                /* Idiomatic way to prevent weird margin behavior on card faces */
                padding-top: 1px;
                margin-top: -1px;
                backface-visibility: hidden;
            }

            :host .face:first-child {
                position: absolute;
            }

            :host .face:nth-child(2) {
                transform: rotateY(180deg);
            }

            :host #movable[side="1"] {
                transform: rotateY(180deg); 
            }
        </style>`
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

        this.setAttribute("side", front);
        this.shadowRoot.querySelector("#movable").setAttribute("side", front);

        const event = new CustomEvent("flip", {detail: front});  // new side
        this.dispatchEvent(event);
    }
}

customElements.define("flip-card", FlipCard);
// card.addEventListener("flip", (e) => {
//     console.log("listened", e, e.detail);
// })

console.log(card);