import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import IPut from 'iput';

function Main() {
  const [ip, setIP] = useState('');

  return (
    <div id="container">
      <h2>Default</h2>
      <IPut />
      <h2>With default value</h2>
      <IPut defaultValue="192.168.1.1" />
      <h2>Set value when onChange</h2>
      <IPut onChange={setIP} />
      <div>IP you input is: {ip}</div>
      <h2>return error when ip is 127.0.0.1</h2>
      <IPut isError={(val)=> val === '127.0.0.1'} />
    </div>
  )
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
