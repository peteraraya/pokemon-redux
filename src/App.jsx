import React, { useEffect, useState } from 'react';
import Pokemones from './components/Pokemones';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Perfil from './components/Perfil';
// Movemos provider y store al index.js

// Importamos react-router-dom
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { auth } from './firebase';


function App() {
  // declaramos una constante de la función que trae nuestro store
  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    // se recomienda utilizar funciones cuando hacemos llamadas a la api
    const fetchUser = () =>{
      auth.onAuthStateChanged(user => {
        console.log(user)
        if (user) {
          setFirebaseUser(user)
        } else {
          setFirebaseUser(null)
        }
      })
    };
    fetchUser();
  }, [])

  const RutaProtegida = ({component, path, ...rest})=>{
    // si no existe el usuario
    if (localStorage.getItem('usuario')) {
      const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
      if (usuarioGuardado.uid === firebaseUser.uid ) {
         return <Route component={component} path={path} {...rest} />
      }else{
        return <Redirect to="/login" {...rest} />
      }
    }else{
      return <Redirect to="/login" {...rest} />
    }
  }


  return firebaseUser !== false ?(

    <Router>
      <div className="container ">
        <Navbar />
        <Switch>
            <RutaProtegida component={Pokemones} path="/" exact/>
            <RutaProtegida component={Perfil} path="/perfil" exact/>
            <Route component={Login} path="/login" exact/>
        </Switch>
      </div>
    </Router>

  ) : ( <div>Cargando ....</div>);
}

export default App;
