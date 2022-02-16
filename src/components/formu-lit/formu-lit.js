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
            test: (step, validation) => {
                const stepCompare = this.form.steps?.find((element) => element.id === validation.pattern.compareWith);
                return (!!step.value && !!stepCompare?.value && (step.value === stepCompare?.value));
            },
            show: (step, validation) => {
                const stepCompare = this.form.steps?.find((element) => element.id === validation.pattern.compareWith);
                return validation.fixed || (step.value !== stepCompare?.value && (this.submitted || !!(step.blured && stepCompare.blured)))
            },
            class: (step, validation) => {
                (validation.show && (validation.valided || step.blured)) || this.submitted
            }
        }
    }

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this.form.steps?.forEach((step, index) => this.checkValidation(step,index));
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
        let {step, index} = e.detail;
        let needCompare = step.validationList?.filter((element) => element.pattern.compareWith);
        if (needCompare.length > 0) {
            let stepIndexCompare = [];
            for (let i = 0; i < needCompare.length; i++) {
                let val = this.form.steps.findIndex((element) => element.id === needCompare[i].pattern.compareWith);
                if (val) {
                    stepIndexCompare.push(val);
                }
            }
            this.checkValidation(step, index);
            for (let j = 0; j < stepIndexCompare.length; j++) {
                this.checkValidation(this.form.steps[stepIndexCompare[j]], stepIndexCompare[j]);
            }
        } else {
            this.checkValidation(step, index);
        }
        this.form = {...this.form};
    }

    checkValidation(step, index) {
        step.dirty = step.value || step.dirty;
        step.blured = step.dirty && step.blured;
        step.validationList.forEach((validation)=> {
            Object.assign(validation, this.checkPattern(step, validation));
        });
        step.valid = !step.validationList.some((element) => element.valid === false);
        step.class = this.submitted || (step.dirty && step.blured)
            ? this.setClass(step.valid)
            : '';
        this.form.steps[index] = step;
    }

    setClass(valid) {
        return valid ? 'valid' : 'invalid';
    }

    checkPattern(step, validation) {
        let status = {};
        if (typeof validation.pattern === 'function') {
            status.valid = validation.pattern(step, validation);
        } else if (validation.pattern instanceof RegExp) {
            status.valid = validation.pattern.test(step.value);
        } else if (typeof validation.pattern === 'object') {
            status = this.customPattern(step, validation);
        }
        status.valided = status.valid || validation.valided;
         status.show = status.show === undefined
             ? validation.fixed || (!status.valid && (this.submitted || status.valided || step.blured))
             : status.show;

        status.class = status.class === undefined
            ? (status.show && (status.valided || step.blured)) || this.submitted
                ? this.setClass(status.valid)
                : ''
            : status.class;

        return status;
    }

    customPattern(step, validation) {
        /** Validación predefinida **/
        if (validation.pattern.compareWith) {
            validation.valid = this.patterns.compareWith.test(step, validation);
            validation.show = this.patterns.compareWith.show(step, validation);
            validation.class = this.patterns.compareWith.class(step, validation);
        }

        /** Validación del usuario **/
        if (validation.pattern.test) {
            validation.valid = validation.pattern.test(step, validation, this);
        }

        if (validation.pattern.show) {
            validation.show = validation.pattern.show(step, validation, this);
        }

        if (validation.pattern.class) {
            validation.class = validation.pattern.class(step,validation, this)
        }
        return validation;
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