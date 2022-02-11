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
          * {
            margin: 0;
            padding: 0;
          }
          :host {
              background-color: gainsboro;
              display:flex;
              flex-flow: column nowrap;
              font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,
                            sans-serif,"Apple Color Emoji","Segoe UI Emoji";
              font-size: 15px;
              max-width: 200px;
              padding: 5px;
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
          p {
            font-size: 10px;
            font-weight: bold;
            padding-left: 10px;
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