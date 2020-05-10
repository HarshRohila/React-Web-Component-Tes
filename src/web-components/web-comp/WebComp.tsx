import React from 'react';
import Style from 'style-it';

class WebComp extends React.Component<{config: any}>{

  constructor(props: Readonly<{config: any}>) {
    super(props);
    console.log('constructor called');
  }
  
  render() {
    console.log('render called', this.props.config);
    return <>
        <Style>
            {`
              h2 {
                font-size: 40px;
              }
            `}
        </Style>
        <h2>Hi, I am inside Web Component!</h2>
        <p>{this.props.config}</p>
        <web-comp-child></web-comp-child>
      </>
  }

  componentWillUnmount() {
    console.log('will unmount called')
  }
}
  
export default WebComp;