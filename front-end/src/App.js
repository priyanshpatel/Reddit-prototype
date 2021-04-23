import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store'

import Routes from './components/routes'
function App() {
  return (
    <Provider store={store}>

    <div className="App">
      <div id="no-popup">
        <BrowserRouter>
          <Routes></Routes>
        </BrowserRouter>
      </div>
      <div id="modal">
      </div>
    </div>
    </Provider>

  );
}

export default App;
