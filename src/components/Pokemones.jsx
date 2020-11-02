// Listado de pokemones

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// importamos nuestra acción
import { anteriorPokemonAccion, obtenerPokemeonesAccion, siguientePokemonAccion, unPokeDetalleAccion } from '../redux/pokeDuks';
import Detalle from './Detalle';


const Pokemones = () => {
    // Para disparar nuestra acción 
    const dispatch = useDispatch();
    // Para llamar consumir nuestra data
    const pokemones = useSelector(store => store.pokemones.results);

    const next = useSelector( store => store.pokemones.next );
    const previous = useSelector(store => store.pokemones.previous );

    // console.log(pokemones);
    useEffect(() => {

        const fetchData = () => {
            dispatch(obtenerPokemeonesAccion())
        }
        fetchData();

    }, [dispatch]);
    return (
        <div className="row m-5 ">
            <div className="col-md-8 bg-secondary rounded border shadow-sm p-2">
                <h4 className="text-light pb-2">Lista de Pokemones</h4>
                <div className="d-flex justify-content-between">
                    {
                        pokemones.length === 0 
                        && 
                        <button 
                            className="btn btn-dark mr-3 " 
                            onClick={() => dispatch(obtenerPokemeonesAccion())}
                            >Get pokemones
                        </button>
                    }
                    {
                        previous &&

                        <button
                            onClick={() => dispatch(anteriorPokemonAccion())}
                            className="btn btn-danger mr-3 ">
                            Anterior
                        </button>
                    }

                    {
                        next &&
                        <button
                            onClick={() => dispatch(siguientePokemonAccion())}
                            className="btn btn-primary ml-3">
                            Siguiente
                        </button>
                    }
                </div>
            
                <ul className="list-group mt-3">
                    {
                        pokemones.map((item, i ) => (
                        <li key={item.name + i} className="list-group-item text-uppercase"> 
                            {item.name}
                            <button 
                                    onClick={() => dispatch(unPokeDetalleAccion(item.url)) }
                                className="btn btn-info btn-sm float-right">
                                    Info
                            </button>
                        </li>
                        ))
                    }
                </ul>
            </div>
            <div className="col-md-4">
                <h3>Detalle Pokemon</h3>
               <Detalle />
            </div>
        </div>
    )
}

export default Pokemones
