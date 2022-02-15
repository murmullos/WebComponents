import { LitElement, html, css } from "lit-element";
import '../step-formulit/step-formulit';

class FormuLit extends LitElement {
    static get properties() {
        return {
            form: Object,
            submitted: Boolean
        }
    }

    patterns = {
        compareWith:  {
            show: this.show_CW,
            style: this.setClass
        }
    }

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this.form.steps?.forEach((step, index) => this.checkValidation({step,index}));
    }

    _onSubmitEvent(e) {
        e.preventDefault();
        this.submitted = true;
        this.form.steps?.forEach((step, index) => this.checkValidation({step,index}));
        this.form.valid = !this.form.steps?.some((element) => element.valid === false);
        this.form = {...this.form};
        this.dispatchEvent(new CustomEvent('submit-formulit', {bubbles: true, detail:this.form}));
    }
    _onChangeEvent(e) {
        this.checkValidation(e.detail);
        this.form = {...this.form};
    }

    checkValidation({step, index}) {
        step.validationList.forEach((validation)=> {
            validation.valid = this.testPattern(step, validation);
            validation.valided = validation.valid ? true : validation.valided;
            validation.show = this.showValidation(step, validation);
            validation.class = this.setStyles(step, validation);
        });
        step.valid = !step.validationList.some((element) => element.valid === false);
        step.class = this.setStyles(step);
        this.form.steps[index] = step;
    }

    setStyles(step, validation) {
        return step.blured || validation?.valided || this.submitted ? this.setClass(validation ? validation.valid : step.valid) : '';
    }

    showValidation (step, validation) {
        return (!validation.valid && (step.blured || this.submitted || validation.valided)) || validation.fixed;
    }

    setClass(valid) {
        return valid ? 'valid' : 'invalid';
    }

    testPattern(step, validation) {
        return typeof validation.pattern === 'function'
            ? validation.pattern(step, validation)
            : validation.pattern instanceof RegExp
                ? validation.pattern.test(step.value)
                : false;
    }

    render() {
        return html`
                    <form name="${this.form.name}" @submit="${this._onSubmitEvent}">
                        ${this.form.steps?.map((step, index) => {
                            return html`
                                    <step-formulit 
                                            @change-formulit="${this._onChangeEvent}"
                                            .index="${index}"
                                            .step="${{...step}}"
                                            .submitted="${this.submitted}">
                                    </step-formulit>`
                        })}
                        <input type="submit" value="${this.form.button?.text}" class="${this.form.button?.class}">
                    </form>
                    `
    }

}

customElements.get('formu-lit') || customElements.define('formu-lit', FormuLit);