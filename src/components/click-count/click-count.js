import { LitElement, html } from "lit-element";

class ClickCount extends LitElement {
    static get properties() {
        return {
            clicks: {
                type: Number
            }
        };
    }

    constructor() {
        super();
        this.clicks = 0;
    }

    incrementalClicks() {
        this.clicks++;
    }

    render() {
        return html`
            <style>
                div {
                    max-width: 200px;
                    background-color: #808080;
                    border: 1px solid black;
                    padding: 10px;
                    margin: 10px;
                }
                h5 {
                    margin: 0;
                    padding: 0;
                }
                input {
                    background-color: #2d2d2d;
                    border-style: none;
                    color : white;
                }
            </style>
            <div>
                <h5>Primer componente contador de clicks</h5>
                <p>Numero de clicks ${this.clicks}</p>
                <input type="button" value="Pulsa para sumar" @click="${this.incrementalClicks}">
            </div>`
    }
}

customElements.get('click-count') || customElements.define('click-count', ClickCount);