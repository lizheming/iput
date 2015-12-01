## IPut

### About

ip input component for react(>=0.14).

### Usage

#### basic Usage

```javascript
  import React from 'react';
  import ReactDOM from 'react-dom';
  import IPut from 'iput';

  ReactDOM.render(
    <IPut />,
    document.getElementById('app')
  );
```

### API

#### IPut props

| name         | type                   | default | description                           |
|--------------|------------------------|---------|---------------------------------------|
| className    | String                 |         | additional css class of root dom node |
| defaultValue | String\|Array\<String\>|         | specify the default ip                |
| onChange     | Function(value:string) |         | called when input value change        |
| isError      | Function               |         | custom function to check value        |

### Example

run `npm start` and open `http://localhost:8080`

online example: http://lizheming.github.io/iput

### License

IPut is released under the MIT license.
