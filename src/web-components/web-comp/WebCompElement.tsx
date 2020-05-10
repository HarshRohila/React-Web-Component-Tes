import ReactDOM from 'react-dom';
import React from 'react';
import WebComp from './WebComp';
import '@webcomponents/custom-elements';
import '@webcomponents/webcomponentsjs';

export default class WComp extends HTMLElement {
    config: any;

    private mountPoint!: HTMLDivElement;

    connectedCallback() {
        this.render();
    }

    render() {
        if (!this.mountPoint) {
            this.mountPoint = document.createElement('div');
            this.attachShadow({ mode: 'open' }).appendChild( this.mountPoint );
        }

        ReactDOM.render(
            <React.StrictMode>
                <WebComp config={this.config}/>
            </React.StrictMode>,
            this.mountPoint
        );
    }

    set prop(prop: any) {
        console.log('got it', prop);
        this.config = prop;
        this.render();
    }

    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode( this.mountPoint );
    }
}
