import { LitElement, html } from "lit-element";

class ConditionalComponent extends LitElement {
    static get properties() {
        return {
            isExist: Boolean,
            email: String
        }
    }

    constructor() {
        super();
        this.isExist = false;
        this.buttonText = 'Mostrar Email';
    }

    changeButton() {
        this.isExist = !this.isExist;
        this.buttonText = 'Mostrar Email';
        if(this.isExist) {
            this.buttonText = "Ocultar Email";
        }
    }

    render() {
        return html`
            <style>
                h5 {
                    margin: 0;
                    padding: 0 0 10px 0;
                }
                .content {
                    background-color: #dddd;
                    max-width: 200px;
                    padding: 10px;
                    margin: 10px;
                }
                .alert {
                    color: red;
                }
            </style>
            <div class="content">
                <h5>Comprobación de condición con click</h5>
                <button @click="${this.changeButton}">${this.buttonText}</button>
                <p>
                ${this.isExist
                    ? html`<div class="alert">${this.email}</div>`
                    : html``
                }
                </p>
            </div>`
    }
}

customElements.get('conditional-component', ConditionalComponent) || customElements.define('conditional-component', ConditionalComponent);