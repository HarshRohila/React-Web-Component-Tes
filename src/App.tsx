import React, { Fragment, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import WebComp from './components/WebComp';

class WComp extends HTMLElement {

  config: any;

  connectedCallback() {
    this.render();
  }

  render() {
    ReactDOM.render(
      <React.StrictMode>
        <WebComp config={this.config}/>
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
customElements.define('web-comp', WComp);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'web-comp': any;
    }
  }
}

function App() {

  const [key, setKey] = useState(0);
  const webCompRef = useRef(null);

  useEffect(() => {
    console.log(webCompRef);
      const wc = webCompRef.current;
      wc && ((wc as WComp).prop = 'config data');
  });

  return (
    <Fragment>
      <button onClick={() => setKey(key + 1)}>Refresh</button>
      <web-comp ref={webCompRef} key={key}></web-comp>
    </Fragment>
  );
}

export default App;
