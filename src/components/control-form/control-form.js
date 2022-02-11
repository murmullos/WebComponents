import {LitElement, html, css} from "lit-element";
import '../input-form/input-form';

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
          :host {
            display: flex;
            flex-flow: column wrap;
            margin: 10px;
          }
          input-form, ul {
            font-family: -apple-system,"Segoe UI Emoji"
          }
          ul {
            font-size: 12px;
            list-style: none;
            margin: 0;
            margin-left: 10px;
            padding: 0;
          }
          li:before {
            content: 'o';
            position: relative;
            left: -3px;
            top: -1px;
          }
          li.valid:before {
            color: green;
          }
          li.invalid:before {
            color: red;
          }
          li.valid {
            color: green;
          }

          li.invalid {
            color: red;
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
                validation.class = this.checkClass(validation);
            });
        this.value = value;
        this.valid = !this.validationList.some((element) => element.valid === false);
    }

    checkClass(validation) {
        if (this.blured || this.onsubmit) {
           return this.setClass(validation.valid);
        } else if (validation.valided) {
           return this.setClass(validation.valid);
        } else {
            return '';
        }
    }

    setClass(valid) {
        return valid ? 'valid' : 'invalid';
    }

    _blurEventHandler(e) {
        this.blured = true;
        this.checkValidation(this.value);
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
                            if (vald.fixed || vald.show) {
                                return html`<li class="${vald.class}">${vald.text}</li>`
                            }
                        })}
                    </ul>
                    `
    }
}

customElements.get('control-form') || customElements.define('control-form', ControlForm);