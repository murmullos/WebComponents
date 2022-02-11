import { LitElement, html, css } from "lit-element";

class ValidationForm extends LitElement {
    static get properties() {
        return {
            fixed: Boolean,
            show:Boolean,
            text: String,
            class:  String
        }
    }

    constructor() {
        super();
    }

    static get css() {
        return css`
          li {
            list-style: none;
          }
          li.valid {
            color: green;
          }
          li.invalid {
            color: red;
          }`
    }

    render () {
        return html `
                ${ this.fixed || this.show ? html`<li class="${this.class}">${this.text}</li>`: ``}
                  `
    }
}

customElements.get('validation-form') || customElements.define('validation-form', ValidationForm);