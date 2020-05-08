import React from 'react';

class WebCompChild extends React.Component<{config: any}>{
  
  render() {
    return <h3>Web comp Child</h3>
  }

  componentWillUnmount() {
    console.log('will unmount called')
  }
}
  
export default WebCompChild;