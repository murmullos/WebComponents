import { LitElement, html, css } from "lit-element";

class InputForm extends LitElement {
    static get properties() {
        return {
            name: String,
            value: String,
            class: String
        }
    }
    static get styles() {
        return css`
          :host {
              display:flex;
              flex-flow: column nowrap;
          }
          input {
            border: 1px solid #33C9FF;
            border-radius: 5px;
            font-size: 15px;
            line-height: 15px;
            padding: 5px;
            outline: none;
          }
          input:focus-visible {
            outline: 1px solid #33D8FF;
          }
          label {
            padding: 0 0 5px 5px
          }
          .valid {
            border: 1px solid green;
            outline: 1px solid green;
          }
          .invalid {
            border: 1px solid red;
            outline: 1px solid red;
          }
        `;
    }

    constructor() {
        super();
    }

    _inputEventHandler(e) {
       this.dispatchEvent(new CustomEvent('change', {detail: {value:e.target.value, index:this.index}}));
    }

    _blurEventHandler(e) {
        this.dispatchEvent(new CustomEvent('blur'));
    }

    render() {
        return html `
                <label for="${this.name}">${this.name}</label>
                <input 
                        id="${this.name}" 
                        type="text" 
                        class="${this.class}"  
                        name="${this.name}" 
                        value="${this.value}" 
                        @input="${this._inputEventHandler}" 
                        @blur="${this._blurEventHandler}">
                `
    }
}

customElements.get('input-form') || customElements.define('input-form', InputForm);