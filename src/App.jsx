import React from 'react';
import Pokemones from './components/Pokemones';

import { Provider } from 'react-redux';

import generateStore from './redux/store';


function App() {
  // declaramos una constante de la función que trae nuestro store
  const store = generateStore();

  return (
    <div className="App">
      <Provider store={store}>
        <Pokemones />
      </Provider>
    </div>
  );
}

export default App;
