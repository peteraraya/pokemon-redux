// Es nuestra tienda donde tendremos todos los estados de nuestra aplicación
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import pokeReducer from './pokeDuks';
import usuarioReducer, {leerUsuarioActivoAccion} from './UsuarioDucks';

const rootReducer = combineReducers({
    pokemones:pokeReducer,
    usuario: usuarioReducer
});

// Utilizamos la extensión de google chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 export default function generateStore(){
     const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk)) )
     leerUsuarioActivoAccion()(store.dispatch)
     return store;
 }