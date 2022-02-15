import {LitElement, html, css} from "lit-element";
import '../input-formulit/input-formulit';
import '../list-formulit/list-formulit';

class StepFormulit extends LitElement {
    static get properties() {
        return {
            step: Object,
            index: Number,
            blured: Boolean,
            value: String
        }
    }

    static get styles() {
        return css`
          :host {
            display: block;
            margin: 10px 0;
          }
        `;
    }

    constructor() {
        super();
    }

    _changeEventHandler(e) {
        this.step.value = e.detail.value;
        this.dispatchEvent(new CustomEvent('change-formulit', {detail: {step:this.step, index:this.index}}));
    }


    _blurEventHandler(e) {
        this.step.blured = true;
        this.dispatchEvent(new CustomEvent('change-formulit', {detail: {step:this.step, index:this.index}}));
    }

    render() {
        return html `
                <input-formulit 
                        @change="${this._changeEventHandler}"
                        @blur="${this._blurEventHandler}"
                        .name="${this.step.name}",
                        .value="${this.step.value}"
                        .class="${this.step.class}">
                </input-formulit>
                <list-formulit .list="${[...this.step.validationList]}"></list-formulit>
                    `
    }
}

customElements.get('step-formulit') || customElements.define('step-formulit', StepFormulit);