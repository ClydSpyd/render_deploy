import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const handleClick = async () => {
    const {data:res} = await axios.get('/api/test');
    console.log(res)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleClick}>click</button>
      </header>
    </div>
  );
}

export default App;
