
import { auth,firebase, db, storage } from '../firebase';

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
    });

    try {
        // el provedor de google se va guardar en este provider
        const provider = new firebase.auth.GoogleAuthProvider();
        // con esta operación vamos abrir un popup
        const res = await auth.signInWithPopup(provider);
        console.log(res.user);

        const usuario = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL
        }

        const usuarioDB = await db.collection('usuarios').doc(usuario.email).get();

        // console.log(usuarioDB)
        if (usuarioDB.exists) {
            dispatch({
                type: USUARIO_EXITO,
                payload: usuarioDB.data()
            });

            // Guardamos en el localStorage
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()));
            
        }else{
            // cuando no existe el usuario
            await db.collection('usuarios').doc(usuario.email).set(usuario);
            dispatch({
                type: USUARIO_EXITO,
                payload: usuario
            });
            // Guardamos en el localStorage
            localStorage.setItem('usuario', JSON.stringify(usuario));
        }

        

        
    } catch (error) {
        console.log(error);
        dispatch({
            type: USUARIO_ERROR
        });
    }
}

export const leerUsuarioActivoAccion = () => (dispatch, getState) =>{

    if (localStorage.getItem('usuario')) {
        dispatch({
            type: USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem('usuario'))
        });
    }
}


export const cerrarSessionAccion = () =>(dispatch) =>{
    // cerramos la sesión 
    auth.signOut();
    localStorage.removeItem('usuario');
    dispatch({
        type: CERRAR_SESION,
    });
}

// utilizamos async ya que es una petición a la base de datos
export const actualizarUsuarioAccion = (nombreActualizado) => async(dispatch, getState) =>{
    // este dispatch se va ejecutar independiente si se produce un error o no
    dispatch({
        type: LOADING,
    });

    const {user} = getState().usuario;

    console.log(user)


    try {
        await db.collection('usuarios').doc(user.email).update({
            displayName: nombreActualizado
        });

        const usuario ={
            ...user,
            displayName:nombreActualizado
        };

        dispatch({
            type: USUARIO_EXITO,
            payload: usuario
        });

        localStorage.setItem('usuario', JSON.stringify(usuario));


    } catch (error) {
        console.log(error);
    }
}

export const editarFotoAccion = (imagenEditada) => async(dispatch, getState)=>{
    console.log(imagenEditada)
    dispatch({
        type: LOADING,
    });

    const { user } = getState().usuario;

    try {
        // imagen que vamos a referenciar y creeamos una carpeta con el email del usuario y luego cree un archivo con el nombre foto de perfil
        const imagenRef = await storage.ref().child(user.email).child('foto perfil');
        // guardamos el archivo actualizando con put
        await imagenRef.put(imagenEditada);
        // getDownload : nos trae la url
        const imagenURL = await imagenRef.getDownloadURL();

        await db.collection('usuarios').doc(user.email).update({
            photoURL: imagenURL
        });

        // si esto es correcto

        const usuario = {
            ...user,
            photoURL: imagenURL
        };

        dispatch({
            type: USUARIO_EXITO,
            payload: usuario
        });

        //actualizamos el localStorage
        localStorage.setItem('usuario', JSON.stringify(usuario));


    } catch (error) {
        console.log(error);
    }
}