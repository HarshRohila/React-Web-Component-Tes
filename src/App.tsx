import React, { Fragment, useState, useRef, useEffect } from 'react';
import './App.scss';
import WComp from './web-components/web-comp/WebCompElement';
import WebCompChildElement from './web-components/web-comp-child/WebCompChildElement';

declare global {
  namespace JSX {
      interface IntrinsicElements {
        'web-comp': any;
        'web-comp-child': any;
      }
  }
}
customElements.define('web-comp', WComp);
customElements.define('web-comp-child', WebCompChildElement);

function App() {

  const [key, setKey] = useState(0);
  const webCompRef = useRef<WComp>(null);

  useEffect(() => {
    console.log(webCompRef);
      const wc = webCompRef.current;

      let count = 2;
      setInterval(() => {
        wc && ((wc as WComp).prop = 'config data' + count++);
      }, 2000);

  });

  return (
    <Fragment>
      <button onClick={() => setKey(key + 1)}>Refresh</button>
      <web-comp ref={webCompRef} key={key}></web-comp>
    </Fragment>
  );
}

export default App;
