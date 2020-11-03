
import { auth,firebase } from '../firebase';

// Data Inicial
const dataInicial = {
    loading:false,
    activo:false
}

// types
const LOADING = 'LOADING';
const USUARIO_ERROR = 'USUARIO_ERROR';
const USUARIO_EXITO = 'USUARIO_EXITO';
const CERRAR_SESION = 'CERRAR_SESION';

// reducers
export default function usuarioReducer(state=dataInicial, action){

    switch (action.type) {
        case LOADING:
            return {...state, loading:true}

        case USUARIO_ERROR:
            return {...dataInicial}

        case USUARIO_EXITO:
            return { ...state, loading: false, user:action.payload, activo:true }

        case CERRAR_SESION:
            return { ...dataInicial }
            
        default:
            return {...state};
    }

}

// actions
export const ingresoUsuarioAccion = () => async(dispatch, getState) => {
    // este dispatch se va ejecutar independiente si se produce un error o no
    dispatch({
        type: LOADING,    
    })

    try {
        // el provedor de google se va guardar en este provider
        const provider = new firebase.auth.GoogleAuthProvider();
        // con esta operación vamos abrir un popup
        const res = await auth.signInWithPopup(provider);
        console.log(res);
        dispatch({
            type: USUARIO_EXITO,
            payload: {
                uid: res.user.uid,
                email: res.user.email
            }
        });

        // Guardamos en el localStorage
        localStorage.setItem('usuario', JSON.stringify({
            uid: res.user.uid,
            email: res.user.email
        }))

        
    } catch (error) {
        console.log(error);
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const leerUsuarioActivoAccion = () => (dispatch, getState) =>{

    if (localStorage.getItem('usuario')) {
        dispatch({
            type: USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }
}


export const cerrarSessionAccion = () =>(dispatch) =>{
    // cerramos la sesión 
    auth.signOut();
    localStorage.removeItem('usuario');
    dispatch({
        type: CERRAR_SESION,
    })
}