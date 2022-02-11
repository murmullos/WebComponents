import {LitElement, html, css} from "lit-element";
import '../input-form/input-form';
import '../validation-form/validation-form'

class ControlForm extends LitElement {
    static get properties() {
        return {
            blured: Boolean,
            name: String,
            value: String,
            valid: String,
            validationList: Array,
            valided: Boolean,
        }
    }

    static get styles() {
        return css`
          * {
            margin: 0;
            padding: 0;
          }
          :host {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
          }
          input-form{
            margin: 20px;
          }
        `;
    }

    constructor() {
        super();
        this.blured = false;
        this.name = 'Name';
        this.valid = false;
        this.validationList = [];
        this.valided = false;
        this.value = '';
    }
    connectedCallback() {
        super.connectedCallback();
    }

    _changeEventHandler(e) {
        this.checkValidation(e.detail.value);
    }

    checkValidation(value) {
        this.validationList.forEach((validation)=> {
                validation.valid = validation.pattern.test(value);
                validation.valided = validation.valid ? true : validation.valided;
                validation.show = (this.blured || validation.valided || this.submitted) && !validation.valid;
                validation.class = this.checkClass(validation.show);
            });
        this.value = value;
        this.valid = !this.validationList.some((element) => element.valid === false);
    }

    checkClass(type) {
        if (this.blured || this.onsubmit) {
           return this.setClass(type);
        } else if (this.valided) {
           return this.setClass(type);
        } else {
            return '';
        }
    }

    setClass(valid) {
        return valid ? 'valid' : 'invalid';
    }

    _blurEventHandler(e) {
        this.blured = true;
    }

    render() {
        return html `
                <input-form 
                        @change="${this._changeEventHandler}"
                        @blur="${this._blurEventHandler}"
                        .name="${this.name}",
                        .value="${this.value}"
                        .class="${this.blured || this.submitted ? this.setClass(this.valid) : ''}">
                </input-form>
                    <ul>
                        ${this.validationList?.map(vald => {
                            return html`<validation-form .fixed="${vald.fixed}" .show="${vald.show}" .text="${vald.text}" .class="${vald.class}"></validation-form>`  
                        })}
                    </ul>
                    `
    }
}

customElements.get('control-form') || customElements.define('control-form', ControlForm);