import {Component} from 'react'
import './App.css';
import JokeBox from './JokeBox';

class App extends Component{
  render() {
    return (
      <div className='App'>
        <JokeBox />
      </div>
    )
  }
}

export default App;
