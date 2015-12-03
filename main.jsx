import React from 'react';
import ReactDOM from 'react-dom';
import IPut from 'iput';

class Main extends React.Component {
  state = {
    ip: ''
  }
  constructor() { super(); }

  render() {
    return (
      <div id="container">
        <h2>Default</h2>
        <IPut />
        <h2>With default value</h2>
        <IPut defaultValue="192.168.1.1" />
        <h2>Set value when onChange</h2>
        <IPut onChange={val => this.setState({ip: val})} />
        <div>IP you input is: {this.state.ip}</div>
        <h2>return error when ip is 127.0.0.1</h2>
        <IPut isError={(val)=> val === '127.0.0.1'} />
      </div>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
