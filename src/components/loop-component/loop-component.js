import { LitElement, html } from "lit-element";
import '../contact-component/contact-component'

class LoopComponent extends LitElement {
    static get properties() {
        return {
            contactos: {
                type:Array
            },
            valor: String
        }
    }

    constructor() {
        super();
        this.valor = 'a la luz';
    }

    eventDetector(e) {
       this.cagado = e.detail?.nombre || '';
       this.valor = "En tu culo";
    }

    render() {
       return html`
                <style>
                    div {
                        max-width: 300px;
                        background-color: #dddddd ;
                        padding: 10px;
                        margin: 10px;
                    }
                    ul {
                        list-style: none;
                    }
                </style>
                <div> ${this.valor}
                    <p>Lista de empleados</p>
                    <ul>
                        ${ html`<contact-component .contactos="${this.contactos}" @culo="${this.eventDetector}"></contact-component>`}
                    </ul>
                    ${this.cagado ? html`<p>Hoy quien tiene el culo cagado es : ${this.cagado}</p>` : ``}
                </div>`
        }
}

customElements.get('loop-component', LoopComponent) || customElements.define('loop-component', LoopComponent);