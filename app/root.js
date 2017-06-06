import React from 'react';
import ReactDOM from 'react-dom';


class Main extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>React is work</h1>
        <ul>
          <li>Node {process.versions.node}</li>
          <li>Chrome {process.versions.chrome}</li>
          <li>Electron {process.versions.electron}</li>
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Main></Main>,
  document.getElementById('root')
)