import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// utilizaremos withRouter para envolver y empujar nuestras rutas
import { withRouter } from 'react-router-dom';
import { ingresoUsuarioAccion } from '../redux/UsuarioDucks';


const Login = (props) => {

    // inicializamos nuestro dispatch   
    const dispatch = useDispatch();

    // con useSelector : podemos llamar a nuestra tienda
    const loading = useSelector(store => store.usuario.loading);
    const activo = useSelector(store => store.usuario.activo);


    // nos sirve para hacer un seguimiento
    useEffect(() => {
        // console.log(activo);
        if (activo) {
            props.history.push('/')
        }
    }, [activo, props.history])
    return (
        <div className="mt-5 text-center card ">
            <div className="card-body">
                <h3 className="card-title">Ingreso con Google</h3>
            </div>
            <div className="card-footer">
                <button 
                    className="btn btn-primary"
                    onClick={() => dispatch(ingresoUsuarioAccion())}
                    disabled={loading}
                    >
                    Acceder
                </button>
            </div>
            
        </div>
    )
}

export default withRouter(Login)
