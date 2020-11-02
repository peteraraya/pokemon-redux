import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unPokeDetalleAccion } from '../redux/pokeDuks';



const Detalle = () => {

  const dispatch = useDispatch();


  useEffect(() => {
      
    const fetchData = () =>{
        dispatch( unPokeDetalleAccion())
    }
    fetchData();

  }, [dispatch]);

  const pokemon = useSelector(store => store.pokemones.unPokemon);
//   console.log(pokemon);

    return pokemon ?(
        <div className="card mt-4 shadow text-center">
            <div className="card-body">
                <img src={pokemon.foto} className="img-fluid img-thumbnail" alt={pokemon.nombre} />
                <div className="card-title font-weight-bold text-uppercase ">{pokemon.nombre}</div>
                <div className="card-text">Alto: {pokemon.alto} | Ancho: {pokemon.ancho} </div>
            </div>
        </div>
    ): null
}

export default Detalle
