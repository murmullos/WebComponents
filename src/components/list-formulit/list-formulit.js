import { LitElement, html, css } from "lit-element";

class ListFormulit extends LitElement {
    static get properties() {
        return {
            list: Array,
            refresh: Boolean
        }
    }

    static get styles() {
        return css`
          :host {
            font-family: "Segoe UI",Helvetica,Arial,sans-serif
          }
          ul, li {
            margin: 0;
            padding: 0;
            padding-left: 5px;
          }
          li {
            font-size: 12px;
            list-style: none;
          }
          li:before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            position: relative;
            left: -3px;
            top: -1px;
            -moz-border-radius: 7.5px;
            -webkit-border-radius: 7.5px;
            border-radius: 7.5px;
            background-color : #7faec9;
          }
          li.valid:before {
            background-color : #5f9b6d;
          }
          li.valid {
            color : #5f9b6d;
          }
          li.invalid:before {
            background-color : #cc7c73;
          }
          li.invalid {
            color: #cc7c73;
          }`
    }

    constructor() {
        super();
        this.list = [];
        this.refresh = false;
    }

    render() {
        return html `
                <ul>
                    ${this.list?.map(element => {
                        if (element.show) {
                            return html`<li class="${element.class}">${element.text}</li>`
                        }
                    })}
                </ul>
        `
    }
}

customElements.get('list-formulit') || customElements.define('list-formulit', ListFormulit);