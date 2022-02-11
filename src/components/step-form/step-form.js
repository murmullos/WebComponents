import { LitElement, html } from "lit-element";
import '../control-form/control-form';

class StepForm extends LitElement {
    static get properties() {
        return {
            formData: Array
        }
    }

    constructor() {
        super();
        this.formData = [];
    }

    render() {
        return html`
            ${this.formData?.map((step) => {
                return html`<control-form .name="${step.name}" .value="${step.value}" .validationList="${step.validationList}"></control-form>`
            })}
        `;
    }

}

customElements.get('step-form') || customElements.define('step-form', StepForm);