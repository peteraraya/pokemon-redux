import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import { cerrarSessionAccion } from "../redux/UsuarioDucks";

const Navbar = (props) => {
  const dispatch = useDispatch();

  const cerrarSesion = () => {
    dispatch(cerrarSessionAccion());
    props.history.push("/login");
  };
  const activo = useSelector((store) => store.usuario.activo);
  return (
    <div className="row navbar navbar-dark bg-danger shadow rounded">
      <Link className="navbar-brand" to="/">
        App Poke
      </Link>
      <div className="d-flex">
        {activo ? (
          <>
            <NavLink className="btn btn-dark mr-2" to="/" exact>
              Inicio
            </NavLink>
            <button
              className="btn btn-danger mr-2 border border-light"
              onClick={() => cerrarSesion()}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <NavLink className="btn btn-dark mr-2" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default withRouter(Navbar);
