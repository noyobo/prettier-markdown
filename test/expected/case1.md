---
title: tipFormmater
order: 5
---

tipFormatter 示例

````jsx
import { Range } from '@ali/ice';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 128
    };
  }

  //onChange,移动结束时,如果startValue和endValue不等,会触发这个事件
  onChange(value) {
    console.log('onChange value:', value);
  }

  //mouseDown以及onMove的时候,如果startValue和endValue不等,会触发这个事件.如果是受控组件,改变state要写在这个事件里
  onProcess(value) {
    console.log('onProcess');
    this.setState({ value });
  }

  formatter(value) {
    return '$' + value;
  }
  render() {
    return (
      <div style={{ width: '400px', margin: '50px' }}>
        <p>范围 0 ~ 1024</p>
        <div style={{ width: '400px', marginTop: '50px' }}>

          <Range
            defaultValue={256}
            tipFormatter={this.formatter.bind(this)}
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            onProcess={this.onProcess.bind(this)}
            min={0}
            max={1024}
            marks={[0, 1024]}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````