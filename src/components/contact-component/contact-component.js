import { LitElement, html} from "lit-element";

class ContactComponent extends LitElement {
    static get properties() {
        return {
           contactos: {
               type: Array
           }
        }
    }

    constructor() {
        super();
    }

    generateEvent(nameEvent,value) {
        return new CustomEvent(nameEvent, {detail:value});
    }

    render() {
        return html`
            ${this.contactos.map(contacto => {
                if (contacto.ganas === true) {
                    this.dispatchEvent(this.generateEvent('culo', contacto));
                }
                return html
                    `<li>
                        <p>${contacto.nombre}<br>
                            ${contacto.email}<br>
                            <span>Estado:${contacto.ganas}</span>
                        </p>
                    </li>`
            })}`
    }
}

customElements.get('contact-component', ContactComponent) || customElements.define('contact-component', ContactComponent);