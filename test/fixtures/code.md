console.log(1)

````jsx
import React, { Component, PropTypes } from "react";

export default class App extends Component {
static displayName = "App";

static propTypes = {
name: PropTypes.string,
};

constructor(props) {
super(props);
}

render() {
return <div />;
}
}
````

```jsx
console.log(2)
```

```js
console.log(3)
```

````js
console.log(4)
````

```javascript
console.log(5)
```

````javascript
console.log(6)
````