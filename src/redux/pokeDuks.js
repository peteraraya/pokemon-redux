import axios from 'axios';

// Cuando trabajamos con reducers tendrenmos dos cosas importantes

// constantes : relaciones
const dataInicial = {
    // Nuestro estado limpio * siempre le colocamos de que tipo va ser nuestro estado
    count: 0,
    next: null,
    previous: null,
    results: []
}

// types : son constantes que generalmente van en mayusculas 

const OBTENER_POKEMONES_EXITO   = 'OBTENER_POKEMONES_EXITO';
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO';
// const ANTERIOR_POKEMONES_EXITO  = 'ANTERIOR_POKEMONES_EXITO';
const POKE_INFO_EXITO = 'POKE_INFO_EXITO';

// reducers : acepta la lista , en los parentesis vamos a tener el estado  y la acciones
export default function pokeReducer(state = dataInicial, action) {

    switch (action.type) {

        case OBTENER_POKEMONES_EXITO:
            return { ...state, ...action.payload }; // cuando se ejecutte la accion a traves de nuestro reducer modificaremos el state

        case SIGUIENTE_POKEMONES_EXITO:
            return { ...state, ...action.payload };
        // return { ...state, array: action.payload.array, offset: action.payload.offset}; 

        case POKE_INFO_EXITO:
            return {...state, unPokemon: action.payload}

        default: // en el caso que no le enviemos un state o no lo pueda leer
            return state;
    }

}

// actions :    consume la api, modificar, etc, 
//  se utiliza una función de flecha que retorna otra función de flecha , una para las acciones con parametros y la siguiente para enviar los dispatch y un getState
// dispatch : activamos el reducer  - y con el getState vamos a obtener la dataInicial o cualquier state

export const unPokeDetalleAccion = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async (dispatch, getState) =>{

    // if (url === undefined) {
    //     url = 'https://pokeapi.co/api/v2/pokemon/1/'
    // }
    if (localStorage.getItem(url)) {
        dispatch({
            type: POKE_INFO_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        });
        console.log('desde localstorage');
        return;
    }

    try {
        console.log('desde api');
        const res = await axios.get(url);
        console.log(res.data);
        dispatch({
            type: POKE_INFO_EXITO,
            payload: {
                nombre: res.data.name,
                ancho:  res.data.weight,
                alto:   res.data.height,
                foto:   res.data.sprites.front_default
            }
        });

     localStorage.setItem(url, JSON.stringify({
         nombre: res.data.name,
         ancho: res.data.weight,
         alto: res.data.height,
         foto: res.data.sprites.front_default
     }));

        
    } catch (error) {
        console.log(error);
    }

}

export const obtenerPokemeonesAccion = () => async (dispatch, getState) => {
    //  esto lee la tienda
    //  console.log('getstate : ',getState().pokemones.offset);
    //  const offset = getState().pokemones.offset
    // const { offset } = getState().pokemones;
    
    // preguntamos si es necesaria la llamada a la api
    if (localStorage.getItem('offset=0')) {
        console.log('datos guardados');
        dispatch({
            // ingresamos nuestro type
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        });
        return;
    }

    try {
        console.log('datos desde la api');
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`);
        // console.log(res.data);
        dispatch({
            // ingresamos nuestro type
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        });

        localStorage.setItem('offset=0',JSON.stringify(res.data));

    } catch (error) {
        console.log(error)
    }
}

export const siguientePokemonAccion = () => async (dispatch, getState) => {
    // const { offset } = getState().pokemones;
    // const siguiente = offset + numero;
    const { next } = getState().pokemones;

    if (localStorage.getItem(next)) {
        console.log('datos guardados');
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(next))
        });
        return;
    }


    try {
        console.log('datos desde la api');
        const res = await axios.get(next);
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        });
        localStorage.setItem(next, JSON.stringify(res.data));

    } catch (error) {
        console.log(error)
    }
}

export const anteriorPokemonAccion = () => async (dispatch, getState) => {

    const { previous } = getState().pokemones;
    
    if (localStorage.getItem(previous)) {
        console.log('datos guardados');
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(previous))
        });
        return;
    }

    try {
        console.log('datos desde la api');
        const res = await axios.get(previous);
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        });
        localStorage.setItem(previous, JSON.stringify(res.data));
    } catch (error) {
        console.log(error)
    }

}

// como vamos hacer un llamado a una api vamos utilizar async 


// PROCEDIMIENTO DE REDUX
 // 1. cREAMOS NUESTRAS ACCIONES
 // 2. LAS ACCIONES SE PROCESAN EN EL REDUCER 
 // 3. EL REDUCER RETORNA UNA ACCION QUE MODIFICA EL STATE


 // *** Es recomendable siempre colocando un default en el switch ****