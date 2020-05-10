import ReactDOM from 'react-dom';
import React from 'react';
import WebCompChild from './WebCompChild';
import '@webcomponents/custom-elements';
import '@webcomponents/webcomponentsjs';

export default class WebCompChildElement extends HTMLElement {
    config: any;

    connectedCallback() {
        this.render();
    }

    render() {
        ReactDOM.render(
            <React.StrictMode>
                <WebCompChild config={this.config}/>
            </React.StrictMode>,
            this
        );
    }

    set prop(prop: any) {
        console.log('got it', prop);
        this.config = prop;
        this.render();
    }

    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this);
    }
}
