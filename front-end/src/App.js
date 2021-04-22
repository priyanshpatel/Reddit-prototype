import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'

import Routes from './components/routes'
function App() {
  return (
    <div className="App">
      <div id="no-popup">
        <BrowserRouter>
          <Routes></Routes>
        </BrowserRouter>
      </div>
      <div id="modal">
      </div>
    </div>
  );
}

export default App;
