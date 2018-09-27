import React, { Component } from 'react';
import './App.css';

// Crée avec create-react-app pour la simplicité de configuration
// Réalisé en 30 min

class App extends Component {

  state = { text: 'this is a test.' }

  onChange = e => this.setState({ text: e.target.value })

  // Fetch handwriting.io api, convert the returned stream to an img url
  // Warning: Does not handle possible errors
  fetchHandwriting = () => {
    fetch('https://api.handwriting.io/render/png?handwriting_id=2D5QW0F80001&text=' + this.state.text, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Basic ' + window.btoa('0J2ASJA7643NZKE6:BPECXZ1KGRMZK2T4'),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).then(res => res.blob()).then(res => {console.log('res: ', res); this.setState({ img: URL.createObjectURL(res) })});
  }

  render() {
    return (
      <div className="App">
        <input onChange={this.onChange} value={this.state.text} />
        <button onClick={this.fetchHandwriting}>fetch</button>
        {this.state.img && <img src={this.state.img} />}
      </div>
    );
  }
}

export default App;
